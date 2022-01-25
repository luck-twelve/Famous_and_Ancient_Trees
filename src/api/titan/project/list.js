import request from 'axios'

export function getList(params) {
    return request({
        url: '/titan/project/list',
        method: 'get',
        params
    })
}
export function getVendorList(params) {
    return request({
        url: '/titan/project/vendor_list',
        method: 'get',
        params
    })
}
