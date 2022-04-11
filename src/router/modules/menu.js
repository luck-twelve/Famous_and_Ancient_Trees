/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const asyncMenus = [
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
            },
            // {
            //     name: 'NewArchives',
            //     path: 'new-archives',
            //     component: () => import('@/views/mainpages/archives/newArchives/index.vue'),
            //     meta: { title: 'New Archives', noCache: true, roles: ['worker'] }
            // },
            {
                name: 'ArchivesSpecies',
                path: 'archives-species',
                component: () => import('@/views/mainpages/archives/archives-species.vue'),
                meta: { title: 'Archives Species', noCache: true, roles: ['admin'] }
            }
        ]
    },
    {
        name: 'Curing',
        component: Layout,
        children: [
            {
                name: 'CuringList',
                path: '/curing-list',
                component: () => import('@/views/mainpages/curing/curing-list.vue'),
                meta: { title: 'Curing List', icon: 'curing', noCache: true, roles: ['worker', 'people'] }
            }
        ]
    },
    {
        title: 'User',
        component: Layout,
        children: [
            {
                name: 'UserList',
                path: '/user-list',
                component: () => import('@/views/mainpages/user/user-list.vue'),
                meta: { title: 'User List', icon: 'peoples', noCache: true, roles: ['admin'] }
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
                meta: { title: 'Abnormal', icon: 'abnormal', noCache: true, roles: ['worker'] }
            }
        ]
    }

]

export default asyncMenus
