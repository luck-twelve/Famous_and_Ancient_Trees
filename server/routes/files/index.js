/* eslint-disable @typescript-eslint/no-var-requires */
const fileControll = require('./config');

const fileApi = (router) => {
    /* file controller */
    /**
     * @api {post} /api/file/getFileList 获取文件列表
     * @apiDescription 获取文件列表
     * @apiName getFileList
     * @apiGroup File
     * @apiSuccess {json} fileList 文件列表
     * @apiSampleRequest http://localhost:3000/api/file/getFileList
     * @apiVersion 1.0.0
     */
    router.post('/file/getFileList', function (req, res, next) {
        fileControll.getFileList(req, res, next)
    })
    /**
     * @api {post} /api/file/setAvatar 设置头像
     * @apiDescription 设置头像
     * @apiName setAvatar
     * @apiGroup File
     * @apiSuccess {json} avatar 头像地址
     * @apiSampleRequest http://localhost:3000/api/file/setAvatar
     * @apiVersion 1.0.0
     */
    router.post('/file/setAvatar', function (req, res, next) {
        fileControll.setAvatar(req, res, next)
    })
}

module.exports = fileApi;