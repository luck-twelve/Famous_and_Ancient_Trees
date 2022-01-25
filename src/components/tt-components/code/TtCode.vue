<template>
  <el-alert :title="title" :type="type" :closable="false"></el-alert>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'error'
  }
})
</script>

<style scoped>
.el-alert {
  padding: 1px 0;
  display: inline;
}
</style>
