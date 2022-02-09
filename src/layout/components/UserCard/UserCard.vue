<template>
  <el-dropdown size="medium" class="ml-2">
    <div class="avatar-wrapper">
      <img :src="store.state.user.avatar" class="user-avatar" />
      <div class="user-name">
        <span>{{ store.state.user.username }}</span>
        <CaretBottom class="caret-bottom" />
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="dialog.dialogVisible = true">
          {{ getI18nName('navbar', 'changePassword') }}
        </el-dropdown-item>
        <el-dropdown-item divided @click="logOut">{{ getI18nName('navbar', 'logOut') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <sub-pass :dialog-visible="dialog.dialogVisible" @close="closeDialog"></sub-pass>
</template>

<script setup>
import { CaretBottom } from '@element-plus/icons-vue'
import SubPass from './SubPass.vue'

import useI18n from '@/hooks/useI18n'
const { getI18nName } = useI18n()

import { getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
const store = useStore()
let { proxy } = getCurrentInstance()

import { reactive } from 'vue'

/**
 * 修改密码弹窗
 */
let dialog = reactive({
  dialogVisible: false
})
const closeDialog = () => {
  dialog.dialogVisible = false
}

/*
 * 退出登录
 * */
const logOut = () => {
  store.dispatch('user/logout').then(() => {
    ElMessage({ message: '退出登录成功', type: 'success' })
    //record the back point
    proxy.$router.push(`/login?redirect=${proxy.$route.fullPath}`)
    //此处reload清空路由和重置部分状态
    // location.reload()
  })
}
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  display: flex;
  position: relative;
  cursor: pointer;

  .user-avatar {
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }

  .user-name {
    color: #5a5e66;
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
    display: flex;
    align-items: center;
  }

  .caret-bottom {
    width: 1em;
    height: 1em;
    margin-left: 4px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}
</style>
