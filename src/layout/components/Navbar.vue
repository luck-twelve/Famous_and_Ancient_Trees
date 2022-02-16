<template>
  <div class="navbar rowBC">
    <div class="rowSC">
      <hamburger
        v-if="settings.showHamburger"
        :is-active="opened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
      <breadcrumb v-if="settings.showBreadcrumb" class="breadcrumb-container" />
      <!-- <header-menu v-if="settings.showHeaderMenu" /> -->
    </div>
    <!--nav title-->
    <div v-if="settings.showNavbarTitle" class="heardCenterTitle">{{ settings.title }}</div>
    <div class="right-menu rowSC">
      <div class="mx-1 mtPx-2">
        <Refresh class="nav-svg-icon" @click="refreshTable" />
      </div>
      <ScreenFull v-if="settings.ShowScreenFull" />
      <SizeSelect v-if="settings.ShowSizeSelect" />
      <LangSelect v-if="settings.ShowLangSelect" />
      <user-card v-if="settings.ShowDropDown"></user-card>
      <LayoutSettings />
    </div>
  </div>
</template>

<script setup>
import SizeSelect from '@/components/SizeSelect/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'
import LayoutSettings from '@/components/LayoutSettings/index.vue'

import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import UserCard from './UserCard'

import { Refresh } from '@element-plus/icons-vue'
import { getCurrentInstance } from 'vue'
let { proxy } = getCurrentInstance()

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

let settings = computed(() => {
  return store.state.app.settings
})
const opened = computed(() => {
  return store.state.app.sidebar.opened
})
const toggleSideBar = () => {
  store.commit('app/M_toggleSideBar')
}

/**
 * 刷新
 */
const refreshTable = () => {
  const fullPath = proxy.$route.fullPath
  proxy.$nextTick(() => {
    proxy.$router.replace({
      path: `/redirect${fullPath}`
    })
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  margin-right: 20px;
}
</style>
