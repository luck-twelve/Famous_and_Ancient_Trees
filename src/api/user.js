import request from 'axios'

export function loginReq(data) {
  return request({
    url: '/api/user/login',
    data,
    method: 'post',
    // isFormData: false,
    bfLoading: false,
    isAlertErrorMsg: false
  })
}

export function getInfoReq() {
  return request({
    url: '/api/user/getUserInfo',
    bfLoading: false,
    method: 'get'
  })
}

export function logoutReq() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}
