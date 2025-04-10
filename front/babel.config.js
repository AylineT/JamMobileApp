module.exports = function (api) {
    api.cache(true)
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
              '@store': './store',
              '@components': './components',
              '@screens': './screens',
              '@services': './services',
              '@utils': './utils',
              '@tamagui.config': './tamagui.config.ts',
            },
          },
        ],
      ],
    }
  }
  