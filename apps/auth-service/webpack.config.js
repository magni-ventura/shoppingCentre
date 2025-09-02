const { merge } = require('webpack-merge');
const nrwlConfig = require('@nrwl/node/src/utils/webpack/custom-webpack'); // or adjust based on your setup
module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.ejs$/,
          use: [
            {
              loader: 'ejs-loader',
              options: {
                // no esModule property explicitly defined here
              }
            }
          ]
        }
      ]
    }
  });
};