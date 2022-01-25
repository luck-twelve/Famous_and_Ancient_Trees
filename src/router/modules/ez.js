/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const EZRouter = [
    {
        title: 'Client Download',
        component: Layout,
        children: [
            {
                path: '/clientDownload',
                name: 'ClientDownload',
                component: () => import('@/views/mainpages/ez/ClientDownload.vue'),
                meta: { title: 'Client Download', icon: 'download', parent: 'EZ' },
            }
        ]
    },
    {
        title: 'Certificate Management',
        component: Layout,
        children: [
            {
                path: '/certificateManagement',
                name: 'CertificateManagement',
                component: () => import('@/views/mainpages/ez/CertificateManage.vue'),
                meta: { title: 'Certificate Management', elSvgIcon: 'Tickets', parent: 'EZ' }
            }
        ]
    },
    {
        path: '/useManual',
        title: 'Use Manual',
        parent: 'EZ',
        component: Layout,
        children: [
            {
                path: 'http://42.193.101.64:10001/docs/intro/',
                meta: { title: 'Use Manual', elSvgIcon: 'Collection', parent: 'EZ' }
            }
        ]
    },
]

export default EZRouter
