/* eslint-env node */
const path = require("path");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { readdirSync, statSync } = require("fs");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");
const SuppressChunksPlugin = require("suppress-chunks-webpack-plugin").default;

const mockupFolder = "./source/mockup/pages/";
const mockupPaths = readdirSync(mockupFolder)
  .filter(name => statSync(mockupFolder + name).isDirectory())
  .map(name => "/" + name)
  .concat("/");

module.exports = () => {
  return {
    devServer: {
      disableHostCheck: true,
      inline: false,
      stats: "minimal"
    },
    devtool: "cheap-module-eval-source-map",
    entry: {
      style: "./source/scss/style.scss",
      static: ["babel-polyfill", "whatwg-fetch", "./source/static.js"]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[chunkhash].js",
      libraryTarget: "umd",
      globalObject: "this"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        },
        {
          enforce: "pre",
          test: /\.scss$/,
          exclude: /node_modules/,
          use: "import-glob"
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract([
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer], sourceMap: true }
            },
            { loader: "resolve-url-loader" },
            { loader: "sass-loader", options: { sourceMap: true } }
          ])
        },
        {
          test: /\.(svg|png|jpg|woff2?|ttf|eot)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]"
            }
          }
        }
      ]
    },
    resolve: {
      modules: [
        "../../demos/node_modules",
        "demos/node_modules",
        "node_modules"
      ],
      extensions: [".js", ".jsx", ".scss"],
      alias: {
        components: path.resolve(__dirname, "source/components"),
        js: path.resolve(__dirname, "source/js")
      }
    },
    plugins: [
      new ExtractTextPlugin("[name].[chunkhash].css"),
      new SuppressChunksPlugin([
        {
          name: "style",
          match: /\.js(.map)?$/
        }
      ]),
      new StaticSiteGeneratorPlugin({
        entry: "static",
        paths: mockupPaths
      }),
      new CopyWebpackPlugin(
        [
          { from: "source/mockup/assets", to: "mockup/assets" },
          { from: "source/mockup/api", to: "mockup/api" }
        ],
        { copyUnmodified: true }
      )
    ]
  };
};
