import request from '../request'

/** 获取人员列表*/
export function downloadFile(params) {
  return request.download({
    url: '/downloadFile',
    method: 'get',
    params
  })
}

/** 添加人员*/
export function uploadFile(data) {
  return request({
    url: '/uploadFile',
    method: 'post',
    data
  })
}
