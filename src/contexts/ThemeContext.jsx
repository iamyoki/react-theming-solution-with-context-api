import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDetectSystemDarkMode } from './ThemeContext/useDetectSystemDarkMode'

const ThemeContext = React.createContext()

/** ThemeProvider
 * @template  T
 * @param {{
 *  themes: T;
 *  defaultThemeKey: keyof T;
 *  defaultFollowSystem: boolean;
 *  lightThemeKey: string;
 *  darkThemeKey: string;
 * }}
 */
function ThemeProvider({
  children,
  themes,
  defaultThemeKey,
  defaultFollowSystem = true,
  lightThemeKey = 'light',
  darkThemeKey = 'dark',
}) {
  if (themes === undefined) {
    throw new TypeError(`Please make your themes prop a plain object`)
  }

  const { isDark } = useDetectSystemDarkMode()
  let defaultTheme = themes[defaultThemeKey] ?? Object.values(themes)[0]
  if (defaultFollowSystem) {
    defaultTheme = isDark ? themes[darkThemeKey] : themes[lightThemeKey]
  }
  const [theme, setTheme] = useState(defaultTheme)

  console.log(theme)

  useEffect(
    function handleFollowSystem() {
      if (defaultFollowSystem) {
        setTheme(isDark ? themes[darkThemeKey] : themes[lightThemeKey])
      }
    },
    [isDark]
  )

  const value = {
    themes,
    defaultThemeKey,
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * useTheme
 * @returns {{
 *  theme: import('global').CustomTheme;
 *  switchTheme: (key: string)=>void;
 *  toggleTheme: function;
 *  setTheme: (newTheme: import('global').CustomTheme)=>void;
 *  curThemeKey: string
 * }}
 */
function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error(`useTheme must be used within ThemeProvider`)
  }

  const { themes, defaultThemeKey, theme, setTheme } = context
  const curThemeKeyRef = useRef(defaultThemeKey ?? Object.keys(themes)[0])

  function switchTheme(themeKey) {
    setTheme(themes[themeKey])
  }

  function toggleTheme(keys = Object.keys(themes)) {
    const nextKeyIndex =
      keys.findIndex((key) => key === curThemeKeyRef.current) + 1
    curThemeKeyRef.current = keys[nextKeyIndex] ?? keys[0]
    setTheme(themes[curThemeKeyRef.current])
  }

  return {
    theme,
    switchTheme,
    toggleTheme,
    setTheme,
    curThemeKey: curThemeKeyRef.current,
  }
}

export { ThemeProvider, useTheme }
