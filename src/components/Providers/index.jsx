import { globalHistory } from '@reach/router'
import { DARK_THEME, THEME } from 'constants/Theme'
import { ThemeProvider } from 'contexts/ThemeContext'
import { QueryParamProvider } from 'use-query-params'
import EmotionThemeProvider from './EmotionThemeProvider'

function Providers({ children }) {
  return (
    <ThemeProvider
      themes={{
        light: THEME,
        dark: DARK_THEME,
      }}>
      <EmotionThemeProvider>
        <QueryParamProvider reachHistory={globalHistory}>
          {children}
        </QueryParamProvider>
      </EmotionThemeProvider>
    </ThemeProvider>
  )
}

export default Providers
