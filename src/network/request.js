import axios from 'axios'
//config：参数
//success：函数
//failure：失败
//第三种方法的简写
// instance(config)返回的就是Promise所以不需要在外面写Promise方法，可以直接返回
export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })
  //2.axios的拦截器
  //拦截请求；config：成功时；err：失败时
  instance.interceptors.request.use(config =>{
    //例子，做项目时可能需要做的操作
    //1.比如config中的一些信息不符合服务器的要求
    //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    //3.某些网络请求（比如登录（token）），|必须携带一些特殊的信息
    // console.log(config)
    //拦截后需要把拦截的数据return
    return config
  },err => {
    console.log(err)
  })
  //拦截响应
  instance.interceptors.response.use(res =>{
    // console.log(res)
    //只需要返回data就可以了
    return res.data
  },err => {
    console.log(err)
  })

  //3.发送真正的网络请求
  return instance(config)
}

//第一种方法
// export function request(config, success, failure) {
//   //1.创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })


//
//   //3.发送真正的网络请求
//   instance(config)
//     .then(res =>{
//       // console.log(res)
//       success(res)
//     })
//     .catch(err =>{
//       // console.log(err)
//       failure(err)
//     })
// }

//第二种方法
// export function request(config) {
//   //1.创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//
//   //3.发送真正的网络请求
//   instance(config.baseConfig)
//     .then(res =>{
//       // console.log(res)
//       config.success(res)
//     })
//     .catch(err =>{
//       // console.log(err)
//       config.failure(err)
//     })
// }

//第三种方法
// export function request(config) {
//   return new Promise((resolve, reject) =>{
//     //1.创建axios实例
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//
//     //3.发送真正的网络请求
//     instance(config)
//       .then(res =>{
//         // console.log(res)
//         resolve(res)
//       })
//       .catch(err =>{
//         // console.log(err)
//         reject(err)
//       })
//   })
// }
