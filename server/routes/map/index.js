/* eslint-disable @typescript-eslint/no-var-requires */
const mapControll = require('./config');

const mapApi = (router) => {
    /* map controller */
    /**
     * @api {get} /api/map/getMapInfo 获取地图标点
     * @apiDescription 获取地图标点
     * @apiName getMapInfo
     * @apiGroup Map
     * @apiSuccess {json} marker 地图标点
     * @apiSampleRequest http://localhost:3000/api/map/getMapInfo
     * @apiVersion 1.0.0
     */
    router.get('/map/getMapInfo', function (req, res, next) {
        mapControll.getMapInfo(req, res, next)
    })
}

module.exports = mapApi;