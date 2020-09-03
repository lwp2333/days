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

const successRes = res => {
  // 接口请求成功
  return res.data.data
}
const successChange = res => {
  // 删除，修改记录成功
  Notify({
    type: 'success',
    message: res.data.message
  })
  return res.data.data
}
const warning = res => {
  // 请求失败，字段缺失
  Notify({
    type: 'warning',
    message: res.data.message
  })
  return Promise.reject(res.data.message)
}
const danger = res => {
  // 请求失败，原因message
  Notify({
    type: 'danger',
    message: res.data.message
  })
  return Promise.reject(res.data.message)
}

// 响应拦截
service.interceptors.response.use(
  res => {
    switch (res.data.code) {
      case 200:
        return successRes(res)
      case 201 || 203:
        return successChange(res)
      case 202 || 204:
        return danger(res)
      case 301:
        return danger(res)
      case 302:
        return warning(res)
      default:
        break
    }
  },
  err => {
    danger(err)
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
