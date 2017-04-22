const path = require('path');
const live = process.env.NODE_ENV === "production";
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // loaders: ["style-loader", "css-loader", "sass-loader"],
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpeg|ttf|...)$/,
        use: [
          {loader: 'url-loader', options: {limit: 8192}}
          // limit => file.size =< 8192 bytes ? DataURI : File
        ]
      }
    ]
  },
  plugins: [
    extractSass
  ],
  entry: [
    path.join(__dirname, "app", "index.js"),
    path.join(__dirname, "app", "app.scss"),
  ]
};
