const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const babelSettings = {
  extends: path.join(__dirname, "/.babelrc")
};

module.exports = (env = {}) => {
  return {
    entry: {
      app: "./app.js"
    },
    output: {
      path: path.resolve(__dirname + "/build"),
      filename: "[name].js"
    },
    devServer: {
      stats: "minimal"
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract([
            { loader: "css-loader" },
            { loader: "postcss-loader", options: { plugins: [autoprefixer] } },
            { loader: "sass-loader" }
          ])
        },
        {
          test: require.resolve("react"),
          loader: "expose-loader?React"
        },
        {
          test: require.resolve("react-dom"),
          loader: "expose-loader?ReactDOM"
        },
        {
          test: require.resolve("react-dom/server"),
          loader: "expose-loader?ReactDOMServer"
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader?" + JSON.stringify(babelSettings) // Don't fuck with this
        }
      ]
    },
    resolve: {
      modules: ["../demos/carousel/node_modules", "node_modules"],
      extensions: [".js", ".jsx", ".scss"]
    },
    plugins: (() => {
      const plugins = [
        new ExtractTextPlugin({
          filename: "app.css",
          allChunks: true
        }),
        new HtmlWebpackPlugin({
          template: "./index.html"
        }),
        new CopyWebpackPlugin([{ from: "doge.jpg", to: "" }])
      ];

      return plugins;
    })()
  };
};
