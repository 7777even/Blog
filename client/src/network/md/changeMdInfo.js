import { request } from "../request";

export function change(info) {
  return request({
    url: '/api/changeMdInfo',
    params: {
      ...info
    }
  })
}
