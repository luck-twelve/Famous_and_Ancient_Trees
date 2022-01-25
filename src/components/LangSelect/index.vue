<template>
  <el-dropdown type="primary" @command="handleSetlang">
    <div class="mx-1">
      <svg-icon icon-class="switch-lang" class="nav-svg-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.value"
          :command="item.value"
          :disabled="lang === item.value"
        >
          <h3 class="px-1 py-1 font-langPx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, reactive, toRefs } from 'vue'
import settings from '@/settings'

const state = reactive({
  langOptions: [
    { label: '中文', value: 'zh' },
    { label: 'English', value: 'en' }
  ]
})

const lang = computed(() => {
  return localStorage.getItem('language') || settings.defaultLanguage
})

const handleSetlang = (lang) => {
  localStorage.setItem('language', lang)
  location.reload()
}
//导出属性到页面中使用
let { langOptions } = toRefs(state)
</script>

<style scoped lang="scss"></style>
