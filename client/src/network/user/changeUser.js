import { request } from "../request";

export function changeUser(user) {
  return request({
    url: '/api/changeUser',
    method: 'post',
    data: {
       ...user
    },
  })
}