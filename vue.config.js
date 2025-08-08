module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 9876,
    proxy: {
      '/api': {
        target: 'https://moujitx.cn/api',
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
