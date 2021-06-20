module.exports = {
  configureWebpack: {
    // 为设置断点调试准备
    devtool: "source-map",
  },
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Vue study",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  lintOnSave: true,
  devServer: {
    hot: true,
    clientLogLevel: "warning",
    host: "localhost",
    port: 8000,
    https: false,
    hotOnly: false,
    open: true,
    // proxy: {
    //   "/api": {
    //     target: "<url>",
    //     ws: true,
    //     changeOrigin: true,
    //   },
    // },
  },
  productionSourceMap: false,
  // css: {
  //   extract: true,
  //   sourceMap: false,
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "~@/assets/css/variable.scss";`,
  //     },
  //   },
  //   modules: false,
  // },
  pluginOptions: {},
};
