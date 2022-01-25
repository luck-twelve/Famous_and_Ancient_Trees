<template>
  <el-menu
    :default-active="activeMenu"
    text-color="#565656"
    active-text-color="white"
    mode="horizontal"
    style="font-weight: bold"
    :ellipsis="false"
    @select="handleSelect"
  >
    <template v-for="item in topMenu" :key="item.name">
      <el-menu-item :index="item.name">{{ getI18nName('route', item.name) }}</el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
//i18
import useI18n from '@/hooks/useI18n'
const { getI18nName } = useI18n()

import { computed, watch, ref } from 'vue'
//导入配置文件
import { useStore } from 'vuex'
const store = useStore()
let topMenu = computed(() => {
  return store.state.permission.topMenu
})
let activeMenu = computed(() => {
  return store.state.permission.activeMenu
})
const handleSelect = (val) => {
  store.dispatch('permission/setActiveMenu', val)
}
watch(
  activeMenu,
  (val) => {
    handleSelect(val)
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.el-menu-item.is-active {
  background-color: #304156 !important;
}
</style>
