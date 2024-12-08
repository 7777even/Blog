import { request } from '../request'


export function getRegister(user) {
  return request({
    url: '/api/register',
    method: 'post',
    data: {
      ...user
    }
  })
}