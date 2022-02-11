/* eslint-disable @typescript-eslint/no-var-requires */
const menuControll = require('./config');

const menuApi = (router) => {
    /* menu controller */
    /**
     * @api {get} /api/menu/getMenus 获取用户菜单
     * @apiDescription 获取用户菜单
     * @apiName getMenus
     * @apiGroup Menu
     * @apiSuccess {json} menuList 菜单树
     * @apiSampleRequest http://localhost:3000/api/menu/getMenus
     * @apiVersion 1.0.0
     */
    router.get('/menu/getMenus', function (req, res, next) {
        menuControll.getMenus(req, res, next)
    })
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