import { request } from "../request";

export function sendMd(md) {
  return request({
    url: '/api/mdEdit',
    method: 'post',
    data: md,
  })
}

export function sendImg(formdata) {
  return request({
    url: '/api/mdImg',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formdata
  })
}

export function getLabels(user) {
  return request({
    url: '/api/labels',
    method: 'get',
    params: {
      ...user
    }
  })
}