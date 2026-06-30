import { useEffect, useRef } from 'react'

export function useInfiniteScroll({ canLoadMore, isLoading, onLoadMore }) {
  const sentinelRef = useRef(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && canLoadMore && !isLoading) {
          onLoadMore()
        }
      },
      { rootMargin: '360px 0px' },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [canLoadMore, isLoading, onLoadMore])

  return sentinelRef
}
