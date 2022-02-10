/* eslint-disable @typescript-eslint/no-var-requires */
const menuControll = require('./config');

const menuApi = (router) => {
    /* menu controller */
    /**
     * @api {get} /menu/getAllMenu 获取全部菜单信息
     * @apiDescription 获取全部菜单信息
     * @apiName getAllMenu
     * @apiGroup Menu
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "success" : "true",
     *      "result" : {
     *          "menu_id" : "menu_id",
     *          "name" : "name",
     *          "logo" : "logo",
     *          "path" : "path",
     *          "menuNum" : "menuNum",
     *          "isValid" : "isValid",
     *          "sort" : "sort"
     *      }
     *  }
     * @apiSampleRequest http://localhost:3000/api/user/login
     * @apiVersion 1.0.0
     */
    router.get('/menu/getAllMenu', function (req, res, next) {
        menuControll.getAllMenu(req, res, next)
    })
}

module.exports = menuApi;