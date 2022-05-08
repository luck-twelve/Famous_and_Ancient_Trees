import request from '../utils/axiosReq'
import { filterParams } from './config'

/**
 * 名木古树调查表
 */
export function getArchivesTreeListReq(data) {
    return request({
        url: '/archives/getArchivesTree',
        method: 'post',
        data: filterParams(data),
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
export function updateArchivesStatusReq(data) {
    return request({
        url: '/archives/updateArchivesStatus',
        data,
        method: 'put',
    })
}
export function deleteArchivesTreeReq(data) {
    return request({
        url: `/archives/deleteArchivesTree?id=${data}`,
        method: 'delete',
    })
}

// 全年古树录入情况
export function getArchivesListEMReq(data) {
    return request({
        url: '/archives/getArchivesListEM',
        method: 'get',
        data
    })
}
// 全年古树总数
export function getArchivesNumberEYReq(data) {
    return request({
        url: `/archives/getArchivesNumberEY?year=${data}}`,
        method: 'get'
    })
}
// 全年树种总数
export function getSpeciesNumberEYReq(data) {
    return request({
        url: `/archives/getSpeciesNumberEY?year=${data}}`,
        method: 'get'
    })
}

/**
 * 树种管理
 */
export function getArchivesSpeciesListReq(data) {
    return request({
        url: '/archives/getArchivesSpecies',
        data: filterParams(data),
        method: 'post',
    })
}
export function updateArchivesSpeciesReq(data) {
    let url = '/archives/updateArchivesSpecies'
    let method = 'put'
    if (!data.id) {
        url = '/archives/addArchivesSpecies'
        method = 'post'
    }
    return request({
        url: url,
        data: filterParams(data),
        method: method,
    })
}
export function deleteArchivesSpeciesReq(data) {
    return request({
        url: `/archives/deleteArchivesSpecies?id=${data}`,
        method: 'delete',
    })
}