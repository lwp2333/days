import axios from 'axios'
import { Notify } from 'vant'
Notify.setDefaultOptions({
  duration: 2200
})

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
  timeout: 6000
})

// 请求前拦截
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截

service.interceptors.response.use(res => {
  if (res.data.code === 200) {
    // 接口请求成功
    return res.data.data
  }
  if (res.data.code === 201 || res.data.code === 203) {
    // 删除，修改记录成功
    Notify({
      type: 'success',
      message: res.data.message
    })
    return res.data.data
  }
  if (res.data.code === 202 || res.data.code === 203) {
    // 删除，修改记录失败
    Notify({
      type: 'danger',
      message: res.data.message
    })
    return Promise.reject(res.data.message)
  }
  if (res.data.code === 301) {
    // 请求失败，原因未知
    Notify({
      type: 'danger',
      message: res.data.message
    })
    return Promise.reject(res.data.message)
  }
  if (res.data.code === 302) {
    // 请求失败，字段缺失
    Notify({
      type: 'warning',
      message: res.data.message
    })
    return Promise.reject(res.data.message)
  }
})

export default service
