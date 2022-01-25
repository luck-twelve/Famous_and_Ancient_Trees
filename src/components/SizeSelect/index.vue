<template>
  <el-dropdown type="primary" @command="handleSetSize">
    <div class="mx-1">
      <svg-icon icon-class="font-size" class="nav-svg-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in sizeOptions" :key="item" :command="item" :disabled="size === item">
          <h3 class="px-1 py-1 font-sizePx14" style="width: 80px">{{ getI18nName('size-menu', item) }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, reactive, toRefs } from 'vue'
//i18
import useI18n from '@/hooks/useI18n'
const { getI18nName } = useI18n()

const state = reactive({
  sizeOptions: ['default', 'medium', 'small', 'mini']
})

const size = computed(() => {
  return localStorage.getItem('size') || 'mini'
})

const handleSetSize = (size) => {
  localStorage.setItem('size', size)
  location.reload()
}
//导出属性到页面中使用
let { sizeOptions } = toRefs(state)
</script>

<style scoped lang="scss"></style>
