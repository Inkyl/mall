import axios from "axios";
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  // 2.axios拦截器
  //拦截请求 两个参数 函数
  instance.interceptors.request.use(config => {
    //拦截一定要返回去
    return config
    // 2.1请求拦截的作用
    // 1.比如config中的一些信息不符合服务器的要求

    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图片

    // 3.某些网络请求（比如登录必须携带一些信息，比如token）
  }, error => {
    console.log(error);
  })
  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, error => {
    console.log(error)
  })
  //3.发送真正的网络请求
  return instance(config)
}
