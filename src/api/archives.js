import request from '../utils/axiosReq'
import { filterParams } from './config'

/**
 * 名木古树调查表
 * @param {*} data 
 * @returns 
 */
export function getArchivesTreeListReq(data) {
    return request({
        url: '/archives/getArchivesTree',
        method: 'post',
        data: filterParams(data),
    })
}

export function addArchivesTreeReq(data) {
    return request({
        url: '/archives/addArchivesTree',
        data: filterParams(data),
        method: 'post',
    })
}

export function updateArchivesTreeReq(data) {
    let url = '/archives/updateArchivesTree'
    let method = 'put'
    if (!data.id) {
        url = '/archives/addArchivesTree'
        method = 'post'
    }
    return request({
        url: url,
        data: filterParams(data),
        method: method,
    })
}

export function deleteArchivesTreeReq(data) {
    return request({
        url: `/archives/deleteArchivesTree?id=${filterParams(data)}`,
        method: 'delete',
    })
}