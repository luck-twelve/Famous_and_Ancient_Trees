<template>
  <div class="ml-2 mtPx-2">
    <svg-icon class="nav-svg-icon" icon-class="setting" @click="drawer = true" />
  </div>
  <div class="drawer-wrap">
    <el-drawer v-model="drawer" title="系统布局配置" size="300px">
      <el-scrollbar>
        <el-form label-position="left" label-width="220px" style="margin-right: 20px">
          <!-- <h3>系统布局配置</h3> -->
          <el-alert
            title="欢迎使用Titan(泰坦)平台"
            description="本平台仅限使用于已授权项目，否则一切后果自负。
          建议使用火狐浏览器，避免证书错误。"
            type="error"
            :closable="false"
          />
          <el-divider content-position="center">顶栏</el-divider>
          <!-- <el-form-item label="面包屑">
            <el-switch v-model="store.state.app.settings.showBreadcrumb" />
          </el-form-item> -->
          <el-form-item label="标题">
            <el-switch v-model="store.state.app.settings.showNavbarTitle" />
          </el-form-item>
          <el-divider content-position="center">侧边栏</el-divider>
          <el-form-item label="Logo">
            <el-switch v-model="store.state.app.settings.sidebarLogo" />
          </el-form-item>
          <el-form-item label="菜单">
            <el-switch v-model="store.state.app.settings.showLeftMenu" />
          </el-form-item>
          <el-form-item label="菜单展开按钮">
            <el-switch v-model="store.state.app.settings.showHamburger" />
          </el-form-item>
          <el-divider content-position="center">功能按钮</el-divider>
          <el-form-item label="全屏按钮">
            <el-switch v-model="store.state.app.settings.ShowScreenFull" />
          </el-form-item>
          <el-form-item label="字体按钮">
            <el-switch v-model="store.state.app.settings.ShowSizeSelect" />
          </el-form-item>
          <el-form-item label="语言切换按钮">
            <el-switch v-model="store.state.app.settings.ShowLangSelect" />
          </el-form-item>
          <el-form-item label="个人信息卡片">
            <el-switch v-model="store.state.app.settings.ShowDropDown" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const drawer = ref(false)
const store = useStore()
</script>

<style lang="scss" scoped>
.drawer-wrap {
  height: 100%;
  cursor: default;
  &:deep(.el-drawer__body) {
    height: 100%;
    padding: 20px 0 60px 20px;
  }
  &:deep(.el-drawer__header) {
    margin-bottom: 0;
  }
}
</style>
