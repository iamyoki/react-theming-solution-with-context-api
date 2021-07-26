import { rgba } from 'polished'

const palette = {
  primary: 'slateblue',
  gray: 'lavender',
  get black() {
    const base = '#17131f'
    return {
      base,
      90: rgba(base, 0.9),
      80: rgba(base, 0.8),
      70: rgba(base, 0.7),
      60: rgba(base, 0.6),
      50: rgba(base, 0.5),
      40: rgba(base, 0.4),
      30: rgba(base, 0.3),
      20: rgba(base, 0.2),
      10: rgba(base, 0.1),
      6: rgba(base, 0.06),
    }
  },
  get white() {
    const base = '#ffffff'
    return {
      base,
      90: rgba(base, 0.9),
      80: rgba(base, 0.8),
      70: rgba(base, 0.7),
      60: rgba(base, 0.6),
      50: rgba(base, 0.5),
      40: rgba(base, 0.4),
      30: rgba(base, 0.3),
      20: rgba(base, 0.2),
      10: rgba(base, 0.1),
      6: rgba(base, 0.06),
    }
  },
}

const colors = {
  primary: palette.primary,
  secondary: palette.gray,
  text: palette.black.base,
  background: palette.white.base,
  black: palette.black,
  white: palette.white,
}

const THEME = {
  colors,
}

const DARK_THEME = {
  colors: {
    ...colors,
    text: palette.white.base,
    background: palette.black.base,
    black: palette.white,
    white: palette.black,
  },
}

export { THEME, DARK_THEME }
