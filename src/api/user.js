import request from '../utils/axiosReq'

export function loginReq(data) {
  return request({
    url: '/user/login',
    data,
    method: 'post',
    // isFormData: false,
    bfLoading: false,
    isAlertErrorMsg: false
  })
}

export function getInfoReq() {
  return request({
    url: '/user/getUserInfo',
    bfLoading: false,
    method: 'get'
  })
}

export function passChangeReq() {
  return request({
    url: '/user/updateUserPassword',
    bfLoading: false,
    method: 'post'
  })
}

export function logoutReq() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserListReq(data) {
  return request({
    url: '/user/getUserList',
    data,
    method: 'post',
  })
}

export function addUserReq(data) {
  return request({
    url: '/user/addUser',
    data,
    method: 'post',
  })
}

export function updateUserReq(data) {
  return request({
    url: '/user/updateUser',
    data,
    method: 'put',
  })
}

export function deleteUserReq(data) {
  return request({
    url: `/user/deleteUser?uid=${data}`,
    method: 'delete',
  })
}