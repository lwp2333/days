import request from '../../utils/request'

/** 获取人员列表*/
export function fileDownload(params) {
  return request.download({
    url: '/download',
    params
  })
}

/** 添加人员*/
export function fileUpload(data) {
  return request({
    url: 'upload',
    method: 'post',
    data
  })
}
