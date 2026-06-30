import { useState } from 'react'

function MoodMatcher({ disabled, onMoodSubmit, suggestedTitle }) {
  const [mood, setMood] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const prompt = mood.trim()
    if (!prompt) {
      return
    }

    onMoodSubmit(prompt)
  }

  return (
    <form className="mood-card" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">AI Mood Matcher</p>
        <h2>Describe your mood. Get one movie match.</h2>
      </div>
      <div className="mood-row">
        <input
          value={mood}
          placeholder="I feel sad but want a high-energy action movie"
          onChange={(event) => setMood(event.target.value)}
        />
        <button type="submit" disabled={disabled || !mood.trim()}>
          Match
        </button>
      </div>
      {suggestedTitle ? (
        <p className="suggestion-text">AI suggested: {suggestedTitle}</p>
      ) : null}
    </form>
  )
}

export default MoodMatcher
