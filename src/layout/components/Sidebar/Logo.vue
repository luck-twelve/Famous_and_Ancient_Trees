<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="pl-1 sidebar-logo-link" to="/dashboard">
        <img v-if="showLogo" src="@/assets/layout/logo.png" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="rowCC sidebar-logo-link" to="/dashboard">
        <img v-if="showLogo" src="@/assets/layout/logo.png" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup>
import { toRefs, reactive, computed } from 'vue'
import { useStore } from 'vuex'
defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
let store = useStore()
let settings = computed(() => {
  return store.state.app.settings
})
const state = reactive({
  title: settings.value.title,
  logo: '@/assets/layout/logo.png',
  showLogo: true
})
//export to page for
let { title, logo, showLogo } = toRefs(state)
</script>

<style lang="scss">
/*
   vue3.0 过度效果
   enter-> enter-from
   leave-> leave-from
  */
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  // padding-left: 10px;
  text-align: left;
  overflow: hidden;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      margin-right: 6px;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
