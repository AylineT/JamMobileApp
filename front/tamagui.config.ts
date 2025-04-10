import { createFont, createTamagui, getConfig } from '@tamagui/core'

// const customFont = createFont({
//   family: 'Inter',
//   size: {
//     true: 16,
//     1: 12,
//     2: 14,
//     3: 16,
//     4: 18,
//     5: 20,
//     6: 24,
//     7: 30,
//   },
//   lineHeight: {
//     true: 22,
//     1: 16,
//     2: 20,
//     3: 22,
//     4: 24,
//     5: 28,
//     6: 32,
//     7: 40,
//   },
//   weight: {
//     true: '400',
//     4: '400',
//     7: '700',
//   },
//   letterSpacing: {
//     4: 0,
//   },
// })

export const config = createTamagui({
  tokens: {
    // width="$sm"
    size: { sm: 8, md: 12, lg: 20 },
    // margin="$-sm"
    space: { lm: 3, sm: 8, md: 12, lg: 20, vb: 50, '-sm': -8 },
    // radius="$none"
    radius: { none: 0, sm: 3 },
    color: { white: '#fff', black: '#1F1F1F', primary: '#0086FF', baba: '#007bff', bginput: '#222', bgimg: "444" },
  },

  themes: {
    light: {
      bg: '#FFF',
      color: '#1F1F1F',
    },
    dark: {
      bg: '#1F1F1F',
      color: '#fff',
    },
  },

  media: {
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    short: { maxHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },

  shorthands: {
    // <View px={20} />
    px: 'paddingHorizontal',
  },

  settings: {
    disableSSR: true, // for client-side apps gains a bit of performance
    allowedStyleValues: 'somewhat-strict-web', // if targeting only web
  },

  // fonts: {
  //   body: customFont,
  //   heading: customFont
  // }
})

// in other files use this:
// console.log(`config is`, getConfig())

// get typescript types on @tamagui/core imports:
type AppConfig = typeof config
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

