import { request } from "../request";

export function getPhoto(limit = 10) {
  return request({
    url: '/api/photowall',
    method: 'get',
    params: {
      limit
    }
  })
}