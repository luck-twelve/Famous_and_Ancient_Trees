/* eslint-disable @typescript-eslint/no-var-requires */
const imageControll = require('./config');

const imageApi = (router) => {
    /* image controller */
    /**
     * @api {get} /api/image/getMarker 获取地图标点
     * @apiDescription 获取地图标点
     * @apiName getMarker
     * @apiGroup Image
     * @apiSuccess {json} marker 地图标点
     * @apiSampleRequest http://localhost:3000/api/image/getMarker
     * @apiVersion 1.0.0
     */
    router.get('/image/getMarker', function (req, res, next) {
        imageControll.getMarker(req, res, next)
    })
}

module.exports = imageApi;