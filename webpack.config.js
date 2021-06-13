const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const { resolve } = path;

module.exports = {
  mode: "development",
  entry: resolve(__dirname, "src/index.jsx"),
  output: {
    filename: "index.js",
    path: resolve(__dirname, "dist"),
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    modules: [resolve(__dirname, "node_modules")],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "jsx",
              target: "es2015",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.html"),
      filename: "index.html",
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, "dist"),
    open: true,
  },
};
