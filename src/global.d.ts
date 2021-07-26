import { THEME } from 'constants/Theme'

export type CustomTheme = typeof THEME

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
