/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const CommunityRouter = [
    {
        path: '/contributionList',
        component: Layout,
        redirect: '/rewardMechanism',
        meta: { title: 'Contribution List', elSvgIcon: 'Trophy', parent: 'Community' },
        children: [
            {
                path: '/rewardMechanism',
                name: 'RewardMechanism',
                component: () => import('@/views/mainpages/community/contribution-list/RewardMechanism.vue'),
                meta: { title: 'Reward Mechanism' }
            },
            {
                path: '/contributionRanking',
                name: 'ContributionRanking',
                component: () => import('@/views/mainpages/community/contribution-list/ContributionRanking.vue'),
                meta: { title: 'Contribution Ranking' }
            },
        ]
    },
    {
        path: '/fingerprintManagement',
        component: Layout,
        meta: { title: 'Fingerprint Management', icon: 'fingerprint', parent: 'Community' },
        children: [
            {
                path: '/fingerprintSubmit',
                name: 'FingerprintSubmit',
                component: () => import('@/views/mainpages/community/fingerprint-management/FingerprintSubmit.vue'),
                meta: { title: 'Fingerprint Submit' }
            },
            {
                path: '/fingerprintList',
                name: 'FingerprintList',
                component: () => import('@/views/mainpages/community/fingerprint-management/FingerprintList.vue'),
                meta: { title: 'Fingerprint List' }
            },
        ]
    },
    {
        path: '/POCManagement',
        component: Layout,
        meta: { title: 'POC Management', icon: 'bug', parent: 'Community' },
        children: [
            {
                path: '/pocSubmit',
                name: 'POCSubmit',
                component: () => import('@/views/mainpages/community/poc-management/PocSubmit.vue'),
                meta: { title: 'POC Submit' }
            },
            {
                path: '/pocList',
                name: 'POCList',
                component: () => import('@/views/mainpages/community/poc-management/PocList.vue'),
                meta: { title: 'POC List' }
            },
            {
                path: '/pocTemplate',
                name: 'POCTemplate',
                component: () => import('@/views/mainpages/community/poc-management/PocTemplate.vue'),
                meta: { title: 'POC Template' }
            },
        ]
    }
]

export default CommunityRouter
