import request from 'axios'

export function getMenuList(params) {
  return request({
    url: '/html/menu',
    method: 'get',
    params
  })
}
