import { request } from '../request'

export function getLogin(user) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      ...user
    }
  })
}