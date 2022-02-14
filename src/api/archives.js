import request from '../utils/axiosReq'

export function getArchivesListReq(data) {
    return request({
        url: '/archives/getArchivesList',
        method: 'post',
        data,
    })
}