const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join, resolve } = require('path');

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "production",
  output: {
    path: join(__dirname, '../../dist/apps/api-gateway'),
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    })
  },
  resolve: {
    alias: {
      '@packages': resolve(__dirname, '../../packages')
    },
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: join(__dirname, 'src/main.ts'),
      tsConfig: join(__dirname, 'tsconfig.app.json'),
      assets: [join(__dirname, 'src/assets')],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true
    })
  ]
};
