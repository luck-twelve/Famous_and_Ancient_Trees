/* eslint-disable @typescript-eslint/no-var-requires */
const archivesControll = require('./config');

const archivesApi = (router) => {
    /* archives controller */
    /**
     * @api {post} /api/archives/getArchivesList 获取档案列表
     * @apiDescription 获取档案列表
     * @apiName getArchivesList
     * @apiGroup Archives
     * @apiSuccess {json} archivesList 档案列表
     * @apiSampleRequest http://localhost:3000/api/archives/getArchivesList
     * @apiVersion 1.0.0
     */
    router.post('/archives/getArchivesList', function (req, res, next) {
        archivesControll.getArchivesList(req, res, next)
    })
}

module.exports = archivesApi;