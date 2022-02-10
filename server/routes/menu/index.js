/* eslint-disable @typescript-eslint/no-var-requires */
const menuControll = require('./config');

const menuApi = (router) => {
    /* menu controller */
    /**
     * @api {get} /api/menu/getAllMenu 获取全部菜单信息
     * @apiDescription 获取全部菜单信息
     * @apiName getAllMenu
     * @apiGroup Menu
     * @apiSuccess {json} menuList 菜单树
     * @apiSampleRequest http://localhost:3000/api/menu/getAllMenu
     * @apiVersion 1.0.0
     */
    router.get('/menu/getAllMenu', function (req, res, next) {
        menuControll.getAllMenu(req, res, next)
    })
}

module.exports = menuApi;