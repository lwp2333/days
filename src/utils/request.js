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

service.interceptors.response.use(
  res => {
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
  },
  err => {
    // 接口调用失败
    Notify({
      type: 'danger',
      message: err.message
    })
    return Promise.reject(err.message)
  }
)
service.download = async (url, params) => {
  // 下载二进制文件
  const fullUrl = process.env.VUE_APP_BASE_API + url
  const res = await axios.get(fullUrl, { params, responseType: 'blob' })
  // 保存文件
  const { fileName } = params
  if (!res.data) {
    Notify({
      type: 'danger',
      message: '文件下载失败'
    })
    return
  }
  if (window.navigator.msSaveBlob) {
    navigator.msSaveBlob(res.data, fileName)
    return
  }
  // 处理兼容IE
  let blobUrl = window.URL.createObjectURL(res.data)
  let link = document.createElement('a')
  link.download = blobUrl
  link.click()
  window.URL.revokeObjectURL(blobUrl)
}

export default service
