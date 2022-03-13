/* eslint-disable @typescript-eslint/no-var-requires */
const archivesControll = require('./config');

const archivesApi = (router) => {
    /* archives controller */
    /**
     * @api {post} /api/archives/getArchives 获取档案列表
     * @apiDescription 获取档案列表
     * @apiName getArchives
     * @apiGroup Archives
     * @apiSuccess {json} archivesList 档案列表
     * @apiSampleRequest http://localhost:3000/api/archives/getArchives
     * @apiVersion 1.0.0
     */
    router.post('/archives/getArchives', function (req, res, next) {
        archivesControll.getArchives(req, res, next)
    })

    /**
     * @api {post} /api/archives/addArchives 新增档案
     * @apiDescription 新增档案
     * @apiName addArchives
     * @apiGroup Archives
     * @apiSampleRequest http://localhost:3000/api/archives/addArchives
     * @apiVersion 1.0.0
     */
    router.post('/archives/addArchives', function (req, res, next) {
        archivesControll.addArchives(req, res, next)
    })

    /**
     * @api {put} /api/archives/updateArchives 编辑档案
     * @apiDescription 编辑档案
     * @apiName updateArchives
     * @apiGroup Archives
     * @apiSampleRequest http://localhost:3000/api/archives/updateArchives
     * @apiVersion 1.0.0
     */
    router.put('/archives/updateArchives', function (req, res, next) {
        archivesControll.updateArchives(req, res, next)
    })

    /**
     * @api {delete} /api/archives/deleteArchives 删除档案
     * @apiDescription 删除档案
     * @apiName deleteArchives
     * @apiGroup Archives
     * @apiSampleRequest http://localhost:3000/api/archives/deleteArchives
     * @apiVersion 1.0.0
     */
    router.delete('/archives/deleteArchives', function (req, res, next) {
        archivesControll.deleteArchives(req, res, next)
    })


    /* archivesTree controller */
    /**
     * @api {post} /api/archives/getArchivesTree 获取名木古树调查表列表
     * @apiDescription 获取名木古树调查表列表
     * @apiName getArchivesTree
     * @apiGroup archivesTree
     * @apiSuccess {json} archivesTreeList 名木古树调查表列表
     * @apiSampleRequest http://localhost:3000/api/archives/getArchivesTree
     * @apiVersion 1.0.0
     */
    router.post('/archives/getArchivesTree', function (req, res, next) {
        archivesControll.getArchivesTree(req, res, next)
    })

    /**
     * @api {post} /api/archives/addArchivesTree 新增名木古树调查表
     * @apiDescription 新增名木古树调查表
     * @apiName addArchivesTree
     * @apiGroup ArchivesTree
     * @apiSampleRequest http://localhost:3000/api/archives/addArchivesTree
     * @apiVersion 1.0.0
     */
    router.post('/archives/addArchivesTree', function (req, res, next) {
        archivesControll.addArchivesTree(req, res, next)
    })

    /**
     * @api {post} /api/archives/updateArchivesTree 修改名木古树调查表
     * @apiDescription 修改名木古树调查表
     * @apiName updateArchivesTree
     * @apiGroup ArchivesTree
     * @apiSampleRequest http://localhost:3000/api/archives/updateArchivesTree
     * @apiVersion 1.0.0
     */
    router.put('/archives/updateArchivesTree', function (req, res, next) {
        archivesControll.updateArchivesTree(req, res, next)
    })

    /**
     * @api {post} /api/archives/updateArchivesStatus 修改名木古树调查表
     * @apiDescription 修改名木古树调查表
     * @apiName updateArchivesStatus
     * @apiGroup ArchivesTree
     * @apiSampleRequest http://localhost:3000/api/archives/updateArchivesStatus
     * @apiVersion 1.0.0
     */
    router.put('/archives/updateArchivesStatus', function (req, res, next) {
        archivesControll.updateArchivesStatus(req, res, next)
    })

    /**
     * @api {delete} /api/archives/deleteArchivesTree 删除名木古树调查表
     * @apiDescription 删除名木古树调查表
     * @apiName deleteArchivesTree
     * @apiGroup ArchivesTree
     * @apiSampleRequest http://localhost:3000/api/archives/deleteArchivesTree
     * @apiVersion 1.0.0
     */
    router.delete('/archives/deleteArchivesTree', function (req, res, next) {
        archivesControll.deleteArchivesTree(req, res, next)
    })


    /* archivesSpecies controller */
    /**
     * @api {post} /api/archives/getArchivesSpecies 获取树种列表
     * @apiDescription 获取树种列表
     * @apiName getArchivesSpecies
     * @apiGroup archivesSpecies
     * @apiSuccess {json} archivesSpeciesList 树种列表
     * @apiSampleRequest http://localhost:3000/api/archives/getArchivesSpecies
     * @apiVersion 1.0.0
     */
    router.post('/archives/getArchivesSpecies', function (req, res, next) {
        archivesControll.getArchivesSpecies(req, res, next)
    })
    /**
     * @api {post} /api/archives/addArchivesSpecies 新增树种
     * @apiDescription 新增树种
     * @apiName addArchivesSpecies
     * @apiGroup archivesSpecies
     * @apiSampleRequest http://localhost:3000/api/archives/addArchivesSpecies
     * @apiVersion 1.0.0
     */
    router.post('/archives/addArchivesSpecies', function (req, res, next) {
        archivesControll.addArchivesSpecies(req, res, next)
    })
    /**
     * @api {put} /api/archives/updateArchivesSpecies 新增树种
     * @apiDescription 新增树种
     * @apiName updateArchivesSpecies
     * @apiGroup archivesSpecies
     * @apiSampleRequest http://localhost:3000/api/archives/updateArchivesSpecies
     * @apiVersion 1.0.0
     */
    router.put('/archives/updateArchivesSpecies', function (req, res, next) {
        archivesControll.updateArchivesSpecies(req, res, next)
    })
}

module.exports = archivesApi;