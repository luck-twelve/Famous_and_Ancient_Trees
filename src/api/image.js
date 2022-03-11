import request from '../utils/axiosReq'

export function getImgByName(name) {
    return request({
        url: `/image/getImage?name=${name}`,
        method: 'get'
    })
}