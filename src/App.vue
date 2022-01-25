<template>
  <router-view />
  <div v-if="settings.showVersionInfo" class="show-version-container">
    {{ showVersionInfo }}
  </div>
</template>

<script setup>
import { computed, onBeforeMount, watch } from 'vue'
import packageJson from '../package.json'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
const store = useStore()
const route = useRoute()
const router = useRouter()
watch(
  route,
  (val) => {
    if (val.path == '/') {
      router.replace({ path: '/dashboard' })
      return
    }
    if (!val.meta.parent) return
    store.dispatch('permission/setActiveMenu', val.meta.parent)
  },
  { deep: true }
)
let settings = computed(() => {
  return store.state.app.settings
})
import { setToken } from '@/utils/auth'
onBeforeMount(() => {
  //set tmp token when setting isNeedLogin false
  if (!settings.value.isNeedLogin) setToken(settings.value.tmpToken)
})

const showVersionInfo = computed(() => {
  return `v${packageJson.version}-${GLOBAL_VAR.GIT_COMMIT_ID}`
})
</script>

<style scoped lang="scss">
.show-version-container {
  position: fixed;
  bottom: 6px;
  right: 6px;
  background: #fff;
  padding: 2px 2px;
  border-radius: 2px;
  opacity: 0.25;
}
</style>
