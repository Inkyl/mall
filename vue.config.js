module.exports = {
  //在此配置可以自动合并
  configureWebpack: {
    //路径相关
    resolve: {
      //别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}