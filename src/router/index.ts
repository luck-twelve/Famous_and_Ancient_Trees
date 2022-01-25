import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

/* Router Modules */
import TitanRouter from './modules/titan'
import DataCenterRouter from './modules/data-center'
import EZRouter from './modules/ez'
import CommunityRouter from './modules/community'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: { title: 'Dashboard', elSvgIcon: 'Fold', affix: true }
      }
    ]
  },
  ...TitanRouter,
  ...DataCenterRouter,
  ...EZRouter,
  ...CommunityRouter
  // {
  //   path: '/setting-switch',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/setting-switch'),
  //       name: 'SettingSwitch',
  //       meta: { title: 'Setting Switch', icon: 'example' }
  //     }
  //   ]
  // },
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   name: 'ErrorLog',
  //   redirect: '/error-log/list',
  //   meta: { title: 'ErrorLog', icon: 'bug' },
  //   children: [
  //     {
  //       path: 'list',
  //       component: () => import('@/views/error-log'),
  //       name: 'ErrorLog',
  //       meta: { title: 'ErrorLog' }
  //     },
  //     {
  //       path: 'error-log-test',
  //       component: () => import('@/views/error-log/ErrorLogTest.vue'),
  //       name: 'ErrorLogTest',
  //       meta: { title: 'ErrorLog Test' }
  //     }
  //   ]
  // },
  // {
  //   path: '/crud',
  //   component: Layout,
  //   meta: { title: 'CRUD', icon: 'guide' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'crud',
  //       component: () => import('@/views/crud'),
  //       name: 'crud',
  //       meta: { title: 'CRUD-Demo' }
  //     },
  //     {
  //       path: 'import-export',
  //       component: () => import('@/views/crud/Vci.vue'),
  //       name: 'ImportExport',
  //       meta: { title: 'Import Export' }
  //     },
  //     {
  //       path: 'img-address-packing',
  //       component: () => import('@/views/crud/ImgAddressPacking.vue'),
  //       name: 'ImgAddressPacking',
  //       meta: { title: 'ImgAdd Pack' }
  //     }
  //   ]
  // },
  // {
  //   path: '/writing-demo',
  //   component: Layout,
  //   meta: { title: 'Writing Demo', icon: 'eye-open' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'hook',
  //       component: () => import('@/views/example/hook/Hook.vue'),
  //       name: 'Hook',
  //       meta: { title: 'Hook-Demo' }
  //     },
  //     {
  //       path: 'vuex-use',
  //       component: () => import('@/views/example/vuex-use/VuexUse.vue'),
  //       name: 'VuexUse',
  //       meta: { title: 'Vuex-Demo' }
  //     },
  //     {
  //       path: 'mock-test',
  //       component: () => import('@/views/example/mock-test/MockTest.vue'),
  //       name: 'MockTest',
  //       meta: { title: 'Mock-Demo' }
  //     },
  //     {
  //       path: 'svg-icon',
  //       component: () => import('@/views/example/svg-icon/SvgIcon.vue'),
  //       name: 'SvgIcon',
  //       meta: { title: 'Svg-Demo' }
  //     },
  //     {
  //       path: 'parent-children',
  //       component: () => import('@/views/example/parent-children/Parent.vue'),
  //       name: 'Parent',
  //       meta: { title: 'Parent-Children' }
  //     },
  //     {
  //       path: 'keep-alive',
  //       component: () => import('@/views/example/keep-alive'),
  //       name: 'KeepAlive',
  //       //cachePage: cachePage when page enter, default false
  //       //leaveRmCachePage: remove cachePage when page leave, default false
  //       meta: { title: 'Keep-Alive', cachePage: true, leaveRmCachePage: false }
  //     },
  //     {
  //       path: 'router-demo-f',
  //       name: 'routerDemoF',
  //       hidden: true,
  //       component: () => import('@/views/example/keep-alive/RouterDemoF.vue'),
  //       meta: { title: 'RouterDemo-F', activeMenu: '/writing-demo/keep-alive' }
  //     },
  //     {
  //       path: 'router-demo-s',
  //       name: 'routerDemoS',
  //       hidden: true,
  //       component: () => import('@/views/example/keep-alive/RouterDemoS.vue'),
  //       meta: { title: 'RouterDemo-S', activeMenu: '/writing-demo/keep-alive' }
  //     }
  //   ]
  // },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'roleIndex',
  //       component: () => import('@/views/permission'),
  //       name: 'Permission',
  //       meta: {
  //         title: 'Role Index'
  //         //roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page.vue'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive.vue'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'code-index',
  //       component: () => import('@/views/permission/CodePermission.vue'),
  //       name: 'CodePermission',
  //       meta: {
  //         title: 'Code Index'
  //       }
  //     },
  //     {
  //       path: 'code-page',
  //       component: () => import('@/views/permission/CodePage.vue'),
  //       name: 'CodePage',
  //       meta: {
  //         title: 'Code Page',
  //         code: 1
  //       }
  //     },

  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
