import Mock from 'mockjs'

export default [
    {
        url: '/html/menu',
        method: 'get',
        response: () => {
            return {
                code: 20000,
                data: {
                    // homeInfo: {
                    //     href: "welcome",
                    //     title: "\u9996\u9875"
                    // },
                    // logoInfo: {
                    //     href: "#",
                    //     image: "/static/images/favicon.jpg",
                    //     title: "Titan"
                    // },
                    menuInfo: [
                        {
                            name: "Titan",
                            child: [
                                {
                                    path: '/projectManagement',
                                    meta: { title: 'Project Management', elSvgIcon: 'Suitcase' },
                                    children: [
                                        {
                                            path: '/projectList',
                                            name: 'ProjectList',
                                            meta: { title: 'Project List' }
                                        },
                                        {
                                            path: '/vendorManagement',
                                            name: 'VendorManagement',
                                            meta: { title: 'Vendor Management' }
                                        },
                                    ]
                                },
                                {
                                    path: '/assetManagement',
                                    meta: { title: 'Asset Management', elSvgIcon: 'Coin' },
                                    children: [
                                        {
                                            path: '/subdomainName',
                                            name: 'SubdomainName',
                                            meta: { title: 'Subdomain Name' }
                                        },
                                        {
                                            path: '/IP',
                                            name: 'IP',
                                            meta: { title: 'IP' }
                                        },
                                        {
                                            path: '/port',
                                            name: 'Port',
                                            meta: { title: 'Port' }
                                        },
                                        {
                                            path: '/url',
                                            name: 'URL',
                                            meta: { title: 'URL' }
                                        },
                                        {
                                            path: '/fingerprint-vulnerability',
                                            name: 'Fingerprint-Vulnerability',
                                            meta: { title: 'Fingerprint / Vulnerability' }
                                        },
                                    ]
                                },
                                {
                                    path: '/gadgets',
                                    meta: { title: 'Gadgets', icon: 'component' },
                                    children: [
                                        {
                                            path: '/segmentC-fofaQuery',
                                            name: 'SegmentC-FofaQuery',
                                            meta: { title: 'Segment C / Fofa Query' }
                                        },
                                        {
                                            path: '/addressReverseQueryIPSegment',
                                            name: 'addressReverseQueryIPSegment',
                                            meta: { title: 'Address reverse query IP segment' }
                                        },
                                        {
                                            path: '/assetSorting',
                                            name: 'AssetSorting',
                                            meta: { title: 'Asset Sorting' }
                                        },
                                    ]
                                },
                                {
                                    path: '/systemManagement',
                                    meta: { title: 'System Management', elSvgIcon: 'Setting' },
                                    children: [
                                        {
                                            path: '/taskList',
                                            name: 'TaskList',
                                            meta: { title: 'Task List' }
                                        },
                                        {
                                            path: '/operationLog',
                                            name: 'OperationLog',
                                            meta: { title: 'Operation Log' }
                                        },
                                        {
                                            path: '/changePassword',
                                            name: 'ChangePassword',
                                            meta: { title: 'Change Password' }
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            name: "Data Center",
                            child: [
                                {
                                    title: 'Vulnerability History / Fingerprint Query',
                                    children: [
                                        {
                                            path: '/vulnerabilityHistoryOrFingerprintQuery',
                                            meta: { title: 'Vulnerability History / Fingerprint Query', icon: 'menu-search' }
                                        }
                                    ]
                                },
                                {
                                    title: 'Data Center URL',
                                    children: [
                                        {
                                            path: '/dataCenterURL',
                                            meta: { title: 'Data Center URL', elSvgIcon: 'Connection' }
                                        }
                                    ]
                                },
                                {
                                    title: 'Data Packet',
                                    children: [
                                        {
                                            path: '/dataPacket',
                                            meta: { title: 'Data Packet', icon: 'dataPacket' }
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            name: "EZ",
                            child: [
                                {
                                    title: 'Client Download',
                                    children: [
                                        {
                                            path: '/clientDownload',
                                            meta: { title: 'Client Download', icon: 'download' },
                                        }
                                    ]
                                },
                                {
                                    title: 'Certificate Management',
                                    children: [
                                        {
                                            path: '/certificateManagement',
                                            meta: { title: 'Certificate Management', elSvgIcon: 'Tickets' }
                                        }
                                    ]
                                },
                                {
                                    title: 'Use Manual',
                                    children: [
                                        {
                                            path: 'http://42.193.101.64:10001/docs/intro/',
                                            meta: { title: 'Use Manual', elSvgIcon: 'Collection' }
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            name: "Community",
                            child: [
                                {
                                    path: '/contributionList',
                                    meta: { title: 'Contribution List', elSvgIcon: 'Trophy', parent: 'Community' },
                                    children: [
                                        {
                                            path: '/rewardMechanism',
                                            meta: { title: 'Reward Mechanism' }
                                        },
                                        {
                                            path: '/contributionRanking',
                                            name: 'ContributionRanking',
                                            meta: { title: 'Contribution Ranking' }
                                        },
                                    ]
                                },
                                {
                                    path: '/fingerprintManagement',
                                    meta: { title: 'Fingerprint Management', icon: 'fingerprint', parent: 'Community' },
                                    children: [
                                        {
                                            path: '/fingerprintSubmit',
                                            meta: { title: 'Fingerprint Submit' }
                                        },
                                        {
                                            path: '/fingerprintList',
                                            meta: { title: 'Fingerprint List' }
                                        },
                                    ]
                                },
                                {
                                    path: '/pocManagement',
                                    meta: { title: 'POC Management', icon: 'bug', parent: 'Community' },
                                    children: [
                                        {
                                            path: '/pocSubmit',
                                            meta: { title: 'POC Submit' }
                                        },
                                        {
                                            path: '/pocList',
                                            meta: { title: 'POC List' }
                                        },
                                        {
                                            path: '/pocTemplate',
                                            meta: { title: 'POC Template' }
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
]