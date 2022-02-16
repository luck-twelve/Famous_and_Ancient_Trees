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