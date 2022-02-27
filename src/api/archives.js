import request from '../utils/axiosReq'

export function getArchivesListReq(data) {
    return request({
        url: '/archives/getArchives',
        method: 'post',
        data,
    })
}

export function addArchivesReq(data) {
    return request({
        url: '/archives/addArchives',
        data,
        method: 'post',
    })
}

export function updateArchivesReq(data) {
    return request({
        url: '/archives/updateArchives',
        data,
        method: 'put',
    })
}

export function deleteArchivesReq(data) {
    return request({
        url: `/archives/deleteArchives?tree_id=${data}`,
        method: 'delete',
    })
}

/**
 * 名木古树调查表
 * @param {*} data 
 * @returns 
 */
export function getArchivesTreeListReq(data) {
    return request({
        url: '/archives/getArchivesTree',
        method: 'post',
        data,
    })
}

export function addArchivesTreeReq(data) {
    return request({
        url: '/archives/addArchivesTree',
        data,
        method: 'post',
    })
}

export function updateArchivesTreeReq(data) {
    return request({
        url: '/archives/updateArchivesTree',
        data,
        method: 'put',
    })
}

export function deleteArchivesTreeReq(data) {
    return request({
        url: `/archives/deleteArchivesTree?archive_id=${data}`,
        method: 'delete',
    })
}