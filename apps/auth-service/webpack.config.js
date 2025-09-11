const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join, resolve } = require('path');

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: join(__dirname, 'src/main.ts'),
  output: {
    path: join(__dirname, '../../dist/apps/auth-service'),
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  resolve: {
    alias: {
      '@packages': resolve(__dirname, '../../../packages'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: join(__dirname, 'src/main.ts'),
      tsConfig: join(__dirname, 'tsconfig.app.json'),
      assets: [join(__dirname, 'src/swagger.json')],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
  ],
};
