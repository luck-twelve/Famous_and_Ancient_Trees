/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const asyncMenus = [
    {
        name: 'User',
        path: '/user',
        component: Layout,
        redirect: 'noRedirect',
        hidden: false,
        alwaysShow: true,
        meta: { title: 'User', icon: 'peoples', roles: ['admin'] },
        children: [
            {
                name: 'UserList',
                path: 'user-list',
                component: () => import('@/views/mainpages/user/user-list.vue'),
                meta: { title: 'User List', noCache: true, roles: ['admin'] }
            }
        ]
    },
    {
        name: 'Declare',
        path: '/declare',
        component: Layout,
        redirect: 'noRedirect',
        hidden: false,
        alwaysShow: true,
        meta: { title: 'Declare', icon: 'declare', roles: ['worker'] },
        children: [
            {
                name: 'DeclareList',
                path: 'declare-list',
                component: () => import('@/views/mainpages/declare/declare-list.vue'),
                meta: { title: 'Declare List', noCache: true, roles: ['worker'] }
            }
        ]
    },
    {
        name: 'Archives',
        path: '/archives',
        component: Layout,
        redirect: 'noRedirect',
        hidden: false,
        alwaysShow: true,
        meta: { title: 'Archives', icon: 'archives', roles: ['worker'] },
        children: [
            {
                name: 'ArchivesList',
                path: 'archives-list',
                component: () => import('@/views/mainpages/archives/archives-list.vue'),
                meta: { title: 'Archives List', noCache: true, roles: ['worker'] }
            }
        ]
    },
    {
        name: 'Curing',
        path: '/curing',
        component: Layout,
        redirect: 'noRedirect',
        hidden: false,
        alwaysShow: true,
        meta: { title: 'Curing', icon: 'curing', roles: ['worker', 'people'] },
        children: [
            {
                name: 'CuringList',
                path: 'curing-list',
                component: () => import('@/views/mainpages/curing/curing-list.vue'),
                meta: { title: 'Curing List', noCache: true, roles: ['worker', 'people'] }
            }
        ]
    },
    {
        title: 'Abnormal',
        component: Layout,
        children: [
            {
                name: 'Abnormal',
                path: '/abnormal',
                component: () => import('@/views/mainpages/abnormal/index.vue'),
                meta: { title: 'Abnormal', icon: 'abnormal', noCache: true, roles: ['worker', 'people'] }
            }
        ]
    }

]

export default asyncMenus
