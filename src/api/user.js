import request from 'axios'

export function loginReq(data) {
  return request({
    url: '/api/user/login',
    data,
    method: 'post',
    isFormData: true,
    bfLoading: false,
    isAlertErrorMsg: false
  })
}

export function getInfoReq() {
  return request({
    url: '/user/getUserInfo',
    bfLoading: false,
    method: 'post'
  })
}

export function logoutReq() {
  return request({
    url: '/user/loginOut',
    method: 'post'
  })
}
