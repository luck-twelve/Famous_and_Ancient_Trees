/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const menuRouter = {
    name: 'User',
    path: '/user',
    component: Layout,
    redirect: 'noRedirect',
    hidden: false,
    alwaysShow: true,
    meta: { title: 'User', icon: 'user', roles: ['editor'] },
    children: [
        {
            name: 'UserList',
            path: 'user-list',
            component: () => import('@/views/charts/keyboard.vue'),
            meta: { title: 'User List', icon: 'peoples', noCache: true, roles: ['editor'] }
        }
    ]
}

export default menuRouter
