import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

/* Router Modules */
import asyncMenus from './modules/menu'

export const constantRoutes = [
  {
    path: '/redirect',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/401',
    hidden: true,
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        meta: { title: 'Dashboard', elSvgIcon: 'Fold', affix: true },
        component: () => import('@/views/dashboard/index.vue')
      }
    ]
  },
  {
    path: '/writing-demo',
    meta: { title: 'Writing Demo', icon: 'eye-open' },
    component: Layout,
    hidden: true,
    alwaysShow: true,
    redirect: 'noRedirect',
    children: [
      {
        name: 'Hook',
        path: 'hook',
        meta: { title: 'Hook-Demo' },
        component: () => import('@/views/example/hook/Hook.vue')
      },
      {
        name: 'VuexUse',
        path: 'vuex-use',
        meta: { title: 'Vuex-Demo' },
        component: () => import('@/views/example/vuex-use/VuexUse.vue')
      },
      {
        name: 'Parent',
        path: 'parent-children',
        meta: { title: 'Parent-Children' },
        component: () => import('@/views/example/parent-children/Parent.vue')
      },
      {
        name: 'KeepAlive',
        path: 'keep-alive',
        //cachePage: cachePage when page enter, default false
        //leaveRmCachePage: remove cachePage when page leave, default false
        meta: { title: 'Keep-Alive', cachePage: true, leaveRmCachePage: false },
        component: () => import('@/views/example/keep-alive')
      },
      {
        name: 'routerDemoF',
        path: 'router-demo-f',
        meta: { title: 'RouterDemo-F', activeMenu: '/writing-demo/keep-alive' },
        hidden: true,
        component: () => import('@/views/example/keep-alive/RouterDemoF.vue')
      },
      {
        name: 'routerDemoS',
        path: 'router-demo-s',
        meta: { title: 'RouterDemo-S', activeMenu: '/writing-demo/keep-alive' },
        hidden: true,
        component: () => import('@/views/example/keep-alive/RouterDemoS.vue')
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  ...asyncMenus,
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
