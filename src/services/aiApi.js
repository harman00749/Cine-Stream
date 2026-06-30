const GEMINI_INTERACTIONS_URL = 'https://generativelanguage.googleapis.com/v1beta/interactions'
const GEMINI_GENERATE_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models'
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

function getPrompt(mood) {
  return `Return exactly one real movie title and nothing else. User mood request: "${mood}"`
}

function cleanTitle(title) {
  return title.replace(/^["']|["']$/g, '').trim()
}

function getFallbackMovieTitle(mood) {
  const text = mood.toLowerCase()

  if (text.includes('action') || text.includes('energy') || text.includes('fight')) {
    return 'Mad Max: Fury Road'
  }

  if (text.includes('sad') || text.includes('emotional') || text.includes('cry')) {
    return 'The Pursuit of Happyness'
  }

  if (text.includes('funny') || text.includes('comedy') || text.includes('laugh')) {
    return 'The Grand Budapest Hotel'
  }

  if (text.includes('thriller') || text.includes('mystery') || text.includes('suspense')) {
    return 'Gone Girl'
  }

  if (text.includes('romance') || text.includes('love')) {
    return 'La La Land'
  }

  if (text.includes('horror') || text.includes('scary')) {
    return 'A Quiet Place'
  }

  return 'Inception'
}

async function readErrorMessage(response) {
  try {
    const data = await response.json()
    return data.error?.message || data.message || response.statusText
  } catch {
    return response.statusText
  }
}

async function askGeminiInteraction(apiKey, mood) {
  const response = await fetch(GEMINI_INTERACTIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      model: 'gemini-3.5-flash',
      input: getPrompt(mood),
      generation_config: {
        max_output_tokens: 24,
        temperature: 0.7,
      },
    }),
  })

  if (!response.ok) {
    const message = await readErrorMessage(response)
    throw new Error(`Gemini failed (${response.status}): ${message}`)
  }

  const data = await response.json()
  return cleanTitle(data.output_text ?? '')
}

async function askGeminiGenerateContent(apiKey, mood, model) {
  const response = await fetch(`${GEMINI_GENERATE_BASE_URL}/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: getPrompt(mood) }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 24,
        temperature: 0.7,
      },
    }),
  })

  if (!response.ok) {
    const message = await readErrorMessage(response)
    throw new Error(`Gemini ${model} failed (${response.status}): ${message}`)
  }

  const data = await response.json()
  return cleanTitle(data.candidates?.[0]?.content?.parts?.[0]?.text ?? '')
}

async function askGemini(mood) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim()
  if (!apiKey) {
    return null
  }

  const attempts = [
    () => askGeminiInteraction(apiKey, mood),
    () => askGeminiGenerateContent(apiKey, mood, 'gemini-2.5-flash'),
    () => askGeminiGenerateContent(apiKey, mood, 'gemini-2.0-flash'),
  ]
  let lastError = null

  for (const attempt of attempts) {
    try {
      const title = await attempt()
      if (title) {
        return title
      }
    } catch (error) {
      lastError = error
    }
  }

  throw lastError ?? new Error('Gemini returned an empty movie title.')
}

async function askOpenAI(mood) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY?.trim()
  if (!apiKey) {
    return null
  }

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Return exactly one real movie title and no explanation.',
        },
        {
          role: 'user',
          content: getPrompt(mood),
        },
      ],
      max_tokens: 24,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const message = await readErrorMessage(response)
    throw new Error(`OpenAI failed (${response.status}): ${message}`)
  }

  const data = await response.json()
  return cleanTitle(data.choices?.[0]?.message?.content ?? '')
}

export async function suggestMovieTitle(mood) {
  try {
    const title = await askGemini(mood)
    if (title) {
      return title
    }

    const openAiTitle = await askOpenAI(mood)
    if (openAiTitle) {
      return openAiTitle
    }
  } catch (error) {
    console.warn('AI mood matcher failed, using local fallback.', error)
  }

  return getFallbackMovieTitle(mood)
}
