/* eslint-disable @typescript-eslint/no-var-requires */
const imageControll = require('./config');

const imageApi = (router) => {
    /* image controller */
    /**
     * @api {get} /api/image/getImage 根据名称获取图片
     * @apiDescription 根据名称获取图片
     * @apiName getImage
     * @apiGroup Image
     * @apiSuccess {json} marker 图片
     * @apiSampleRequest http://localhost:3000/api/image/getImage
     * @apiVersion 1.0.0
     */
    router.get('/image/getImage', function (req, res, next) {
        imageControll.getImage(req, res, next)
    })
}

module.exports = imageApi;