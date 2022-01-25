<template>
  <el-button :type="type" style="padding: 0 5px; min-height: 24px; font-size: 12px">
    <slot />
  </el-button>
</template>

<script setup>
defineProps({
  type: {
    default: '',
    type: String
  }
})
</script>
