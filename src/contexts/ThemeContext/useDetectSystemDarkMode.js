import { useState, useRef, useEffect } from 'react'

function useDetectSystemDarkMode() {
  /** @type {{current: MediaQueryList}} */
  const matchMediaRef = useRef(
    window.matchMedia('(prefers-color-scheme: dark)')
  )
  const defaultIsDark = matchMediaRef.current.matches
  const [isDark, setIsDark] = useState(defaultIsDark)

  useEffect(function handleSystemThemeModeChange() {
    matchMediaRef.current.addEventListener('change', (e) => {
      setIsDark(e.matches)
    })

    return () =>
      matchMediaRef.current.addEventListener('change', (e) => {
        setIsDark(e.matches)
      })
  }, [])

  return {
    isDark,
  }
}

export { useDetectSystemDarkMode }
