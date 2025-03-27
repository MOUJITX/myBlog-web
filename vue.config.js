module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 9876,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8988',
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
      },
      '/files': {
        target: 'https://cloudfiles.moujitx.cn/web-blog',
        changeOrigin: true,
        pathRewrite: {
          '/files': '',
        },
      },
    },
  },
};
