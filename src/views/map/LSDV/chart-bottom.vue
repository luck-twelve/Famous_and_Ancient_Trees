<template>
  <el-card shadow="always" class="widthPC-100">
    <template #header>
      <div class="rowSS">
        <img src="@/assets/LSDV_images/analysis_l.png" class="title-logo" />
        <div class="ml-1">
          <h4><b>古树名木分布分析</b></h4>
          <span class="font-sizePx12">Ancient tree resources</span>
        </div>
      </div>
    </template>
    <archives></archives>
  </el-card>
</template>

<script setup>
import Archives from './components/archives.vue'
</script>

<style lang="scss" scoped>
// .widthPC-100 {
//   height: 300px;
// }
.title-logo {
  width: 30px;
}
:deep(.el-card__header) {
  border: none !important;
  padding-bottom: 0;
}
:deep(.el-card__body) {
  padding-top: 0 !important;
}
</style>
