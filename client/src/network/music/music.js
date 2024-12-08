import { request } from "../request";

export function getMusic() {
  return request({
    url: '/api/music',
    method: 'post'
  })
}