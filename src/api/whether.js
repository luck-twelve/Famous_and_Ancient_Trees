import request from '../utils/axiosReq'

export function getWhether(data) {
    return request({
        url: 'https://www.yiketianqi.com/free/day?appid=79875459&appsecret=jy5xrNDW&vue=1',
        method: 'get'
    })
}