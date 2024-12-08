import { request } from '../request'

export function del(info) {
  return request({
    url: '/api/delMd',
    method: 'post',
    data: {
      ...info
    }
  })
}