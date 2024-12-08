import { request } from "../request";

export function getMd(user) {
  return request({
    url: '/api/getMd',
    method: 'post',
    data: {
      ...user
    }
  })
}

export function getLabelInfo(user) {
  return request({
    url: '/api/getLabelInfo',
    method: 'post',
    data: {
      ...user
    }
  })
}