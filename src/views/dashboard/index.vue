<template>
  <Admin v-if="roles.includes('admin') || roles.includes('worker')" />
  <Editor v-else />
</template>

<script setup>
import Admin from './Admin'
import Editor from './Editor'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const roles = computed(() => {
  return store.state.user.roles
})
</script>

<style scoped lang="scss"></style>
