import request from '../utils/axiosReq'

export function getMenusReq() {
    return request({
        url: '/menu/getMenus',
        method: 'get',
        bfLoading: false
    })
}