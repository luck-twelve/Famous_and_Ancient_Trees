/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const DataCenterRouter = [
    {
        title: 'Vulnerability History / Fingerprint Query',
        component: Layout,
        children: [
            {
                path: '/vulnerabilityHistoryOrFingerprintQuery',
                name: 'VulnerabilityHistoryOrFingerprintQuery',
                component: () => import('@/views/mainpages/data-center/VHistFingQuery.vue'),
                meta: { title: 'Vulnerability History / Fingerprint Query', icon: 'menu-search', parent: 'Data Center' }
            }
        ]
    },
    {
        title: 'Data Center URL',
        component: Layout,
        children: [
            {
                path: '/dataCenterURL',
                name: 'DataCenterURL',
                component: () => import('@/views/mainpages/data-center/DataCenterURL.vue'),
                meta: { title: 'Data Center URL', elSvgIcon: 'Connection', parent: 'Data Center' }
            }
        ]
    },
    {
        title: 'Data Packet',
        component: Layout,
        children: [
            {
                path: '/dataPacket',
                name: 'DataPacket',
                component: () => import('@/views/mainpages/data-center/DataPacket.vue'),
                meta: { title: 'Data Packet', icon: 'dataPacket', parent: 'Data Center' }
            }
        ]
    },
]

export default DataCenterRouter
