import request from '../utils/axiosReq'

export function getMarkerImg() {
    return request({
        url: '/image/getMarker',
        method: 'get',
    })
}