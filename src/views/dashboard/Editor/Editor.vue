<template>
  <div class="dashboard-editor-container">
    <div class="clearfix">
      <pan-thumb :image="avatar" style="float: left">
        <span v-for="item in roles" :key="item" class="pan-info-roles">{{ getI18nName('roles', item) }}</span>
      </pan-thumb>
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
      </div>
    </div>
    <img :src="emptyGif" class="emptyGif" />
  </div>
</template>

<script setup>
import PanThumb from '@/views/dashboard/PanThumb'
import { toRefs, reactive, computed } from 'vue'
import { useStore } from 'vuex'

//i18
import useI18n from '@/hooks/useI18n'
const { getI18nName } = useI18n()

const state = reactive({
  emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
})

const store = useStore()
const name = computed(() => {
  return store.state.user.username
})
const avatar = computed(() => {
  return store.state.user.avatar
})
const roles = computed(() => {
  return store.state.user.roles
})
let { emptyGif } = toRefs(state)
</script>

<style lang="scss" scoped>
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}

.dashboard-editor-container {
  background-color: #e3e3e3;
  height: calc(100vh - 50px - 30px - 2px - 16px * 2);
  padding: 50px 60px 0;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}
</style>
