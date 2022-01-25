/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const TitanRouter = [
    {
        component: Layout,
        meta: { title: 'Project Management', elSvgIcon: 'Suitcase', parent: 'Titan' },
        children: [
            {
                path: '/projectList',
                name: 'ProjectList',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/project-management/ProjectList.vue'),
                meta: { title: 'Project List' }
            },
            {
                path: '/vendorManagement',
                name: 'VendorManagement',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/project-management/VendorManagement.vue'),
                meta: { title: 'Vendor Management' }
            },
        ]
    },
    {
        component: Layout,
        meta: { title: 'Asset Management', elSvgIcon: 'Coin', parent: 'Titan' },
        children: [
            {
                path: '/subdomainName',
                name: 'SubdomainName',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/asset-management/SubdomainName.vue'),
                meta: { title: 'Subdomain Name' }
            },
            {
                path: '/IP',
                name: 'IP',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/asset-management/IP.vue'),
                meta: { title: 'IP' }
            },
            {
                path: '/port',
                name: 'Port',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/asset-management/Port.vue'),
                meta: { title: 'Port' }
            },
            {
                path: '/url',
                name: 'URL',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/asset-management/URL.vue'),
                meta: { title: 'URL' }
            },
            {
                path: '/fingerprint-vulnerability',
                name: 'Fingerprint-Vulnerability',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/asset-management/FingerprintVulnerability.vue'),
                meta: { title: 'Fingerprint / Vulnerability' }
            },
        ]
    },
    {
        parent: 'Titan',
        component: Layout,
        meta: { title: 'Gadgets', icon: 'component', parent: 'Titan' },
        children: [
            {
                path: '/segmentC-fofaQuery',
                name: 'SegmentC-FofaQuery',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/gadgets/SCFofaQuery.vue'),
                meta: { title: 'Segment C / Fofa Query' }
            },
            {
                path: '/addressReverseQueryIPSegment',
                name: 'addressReverseQueryIPSegment',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/gadgets/ARQueryIPS.vue'),
                meta: { title: 'Address reverse query IP segment' }
            },
            {
                path: '/assetSorting',
                name: 'AssetSorting',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/gadgets/AssetSorting.vue'),
                meta: { title: 'Asset Sorting' }
            },
        ]
    },
    {
        parent: 'Titan',
        component: Layout,
        meta: { title: 'System Management', elSvgIcon: 'Setting', parent: 'Titan' },
        children: [
            {
                path: '/taskList',
                name: 'TaskList',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/system-management/TaskList.vue'),
                meta: { title: 'Task List' }
            },
            {
                path: '/operationLog',
                name: 'OperationLog',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/system-management/OperationLog.vue'),
                meta: { title: 'Operation Log' }
            },
            {
                path: '/changePassword',
                name: 'ChangePassword',
                parent: 'Titan',
                component: () => import('@/views/mainpages/titan/system-management/ChangePassword.vue'),
                meta: { title: 'Change Password' }
            },
        ]
    }
]

export default TitanRouter
