import request from '../utils/axiosReq'
import { filterParams } from './config'

/**
 * 异常信息
 */
export function getAbnormalListReq(data) {
    return request({
        url: '/abnormal/getAbnormalList',
        data: filterParams(data),
        method: 'post',
    })
}
export function updateAbnormalReq(data) {
    let url = '/abnormal/updateAbnormal'
    let method = 'put'
    if (!data.id) {
        url = '/abnormal/addAbnormal'
        method = 'post'
    }
    return request({
        url: url,
        data: filterParams(data),
        method: method,
    })
}
export function deleteAbnormalReq(data) {
    return request({
        url: `/abnormal/deleteAbnormal?id=${data.id}&listing=${data.listing}`,
        method: 'delete',
    })
}


export function getAbnormalListEMReq() {
    return request({
        url: '/abnormal/getAbnormalListEM',
        method: 'get',
    })
}