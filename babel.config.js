module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          alias: {
            '@src/components': './src/components',
            '@src/firebase': '.src/firebase',
            '@src/localization': '.src/localization',
            '@src/navigation': './src/navigation',
            '@src/screens': './src/screens',
            '@src/types': './src/types',
            '@src/utils': './src/utils',
          },
        },
      ],
    ],
  }
}
