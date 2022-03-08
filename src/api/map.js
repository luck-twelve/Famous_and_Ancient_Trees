import request from '../utils/axiosReq'

export function getMapInfo() {
    return request({
        url: '/map/getMapInfo',
        method: 'get',
    })
}