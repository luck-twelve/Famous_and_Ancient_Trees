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
      <header-menu v-if="settings.showHeaderMenu" />
    </div>
    <!--nav title-->
    <div v-if="settings.showNavbarTitle" class="heardCenterTitle">{{ settings.title }}</div>
    <div class="right-menu rowSC">
      <ScreenFull v-if="settings.ShowScreenFull" />
      <SizeSelect v-if="settings.ShowSizeSelect" />
      <LangSelect v-if="settings.ShowLangSelect" />
      <user-card v-if="settings.ShowDropDown"></user-card>
      <SkinSelect />
    </div>
  </div>
</template>

<script setup>
import SizeSelect from '@/components/SizeSelect/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'
import SkinSelect from '@/components/SkinSelect/index.vue'

import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import HeaderMenu from './HeaderMenu'
import UserCard from './UserCard'

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
