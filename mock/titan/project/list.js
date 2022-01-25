import Mock from 'mockjs'

const data = Mock.mock({
    'list|10': [
        {
            name: '@ctitle(5,8)',
            pid: '@natural(33, 99)',
            remark: '@sentence(10, 20)',
            'status|1': [0, 1, 2, 3, 4],
            uid: '@natural(1, 30)',
            start_time: '@date("yyyy-MM-dd")',
            end_time: '@date("yyyy-MM-dd")',
            create_time: '@date("yyyy-MM-dd")'
        }
    ],
    'vendorList|10': [
        {
            pid: '@natural(33, 99)',
            cid: '@natural(33, 99)',
            name: '@ctitle(5,8)',
            'corp_type|1': [0, 1, 2, 3, 4],
            'status|1': [0, 1, 2, 3, 4],
            uid: '@natural(1, 30)',
            create_time: '@date("yyyy-MM-dd")'
        }
    ]
})

export default [
    {
        url: '/titan/project/list',
        method: 'get',
        response: () => {
            const list = data.list
            return {
                code: 20000,
                count: list.length,
                data: list,
                msg: ''
            }
        }
    },
    {
        url: '/titan/project/vendor_list',
        method: 'get',
        response: () => {
            const vendorList = data.vendorList
            return {
                code: 20000,
                count: vendorList.length,
                data: vendorList,
                msg: ''
            }
        }
    },
]
