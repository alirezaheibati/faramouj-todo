const path = require("path");
module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
      { test: /\.html$/, loader: "html-loader" },
    ],
  },
  output: {
    publicPath: "output",
    filename: "bundle.js",
    path: path.resolve(__dirname, "output"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
  },
};
