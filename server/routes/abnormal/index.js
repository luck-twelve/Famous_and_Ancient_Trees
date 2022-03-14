/* eslint-disable @typescript-eslint/no-var-requires */
const abnormalControll = require('./config');

const abnormalApi = (router) => {
    /* abnormal controller */
    /**
     * @api {post} /api/abnormal/getAbnormalList
     * @apiDescription 获取异常信息列表
     * @apiName getAbnormalList
     * @apiGroup Abnormal
     * @apiSuccess {json} abnormalList 异常信息列表
     * @apiSampleRequest http://localhost:3000/api/abnormal/getAbnormalList
     * @apiVersion 1.0.0
     */
    router.post('/abnormal/getAbnormalList', function (req, res, next) {
        abnormalControll.getAbnormalList(req, res, next)
    })
    /**
     * @api {post} /api/abnormal/addAbnormal
     * @apiDescription 新增异常信息
     * @apiName addAbnormal
     * @apiGroup Abnormal
     * @apiSuccess {json} abnormal 异常信息
     * @apiSampleRequest http://localhost:3000/api/abnormal/addAbnormal
     * @apiVersion 1.0.0
     */
    router.post('/abnormal/addAbnormal', function (req, res, next) {
        abnormalControll.addAbnormal(req, res, next)
    })
    /**
     * @api {post} /api/abnormal/updateAbnormal
     * @apiDescription 编辑异常信息
     * @apiName updateAbnormal
     * @apiGroup Abnormal
     * @apiSuccess {json} abnormal 异常信息
     * @apiSampleRequest http://localhost:3000/api/abnormal/updateAbnormal
     * @apiVersion 1.0.0
     */
    router.put('/abnormal/updateAbnormal', function (req, res, next) {
        abnormalControll.updateAbnormal(req, res, next)
    })
    /**
     * @api {post} /api/abnormal/deleteAbnormal
     * @apiDescription 异常信息
     * @apiName deleteAbnormal
     * @apiGroup Abnormal
     * @apiSuccess {json} abnormal 异常信息
     * @apiSampleRequest http://localhost:3000/api/abnormal/deleteAbnormal
     * @apiVersion 1.0.0
     */
    router.delete('/abnormal/deleteAbnormal', function (req, res, next) {
        abnormalControll.deleteAbnormal(req, res, next)
    })
}

module.exports = abnormalApi;