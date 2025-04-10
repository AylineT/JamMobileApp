import { createTamagui } from 'tamagui'

const config = createTamagui({
  tokens: {
    size: {
      true: 16,
      sm: 8,
      md: 12,
      lg: 20,
    },
    space: {
      true: 16,
      sm: 8,
      md: 12,
      lg: 20,
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 16,
    },
    color: {
      white: '#ffffff',
      black: '#000000',
      primary: '#0086FF',
    },
  },
  themes: {
    light: {
      bg: '#ffffff',
      color: '#000000',
    },
    dark: {
      bg: '#000000',
      color: '#ffffff',
    },
  },
  shorthands: {
    px: 'paddingHorizontal',
    py: 'paddingVertical',
  },
  media: {
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 861 },
  },
  settings: {
    disableSSR: true,
    allowedStyleValues: 'strict',
  },
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
