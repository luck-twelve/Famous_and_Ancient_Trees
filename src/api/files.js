import request from '../utils/axiosReq'

export function setAvatarReq(data) {
    return request({
        url: '/file/setAvatar',
        method: 'post',
        data,
    })
}