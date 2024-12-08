import { request } from "../request";

export function addComment(data) {
  return request({
    url: "/api/addComment",
    method: "post",
    data,
  });
}

export function getComment(params) {
  return request({
    url: "/api/getComment",
    method: "get",
    params,
  });
}
