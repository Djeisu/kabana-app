module.exports = {
  configureWebpack: {
    output: {
      filename: '[name].js'
      // chunkFilename: 'chunck.js'
    }
    // optimization: {
    //   splitChunks: false
    // }
  },
  // css: {
  //   extract: false
  // },
  productionSourceMap: false,
  filenameHashing: false
}
