<template>
  <el-card shadow="always" class="widthPC-45">
    <template #header>
      <div class="rowSS">
        <img src="@/assets/LSDV_images/analysis_r.png" class="title-logo" />
        <div class="ml-1">
          <h4><b>古树资源</b></h4>
          <span class="font-sizePx12">Ancient tree resources</span>
        </div>
      </div>
    </template>
    <div class="rowBS">
      <div class="group-item font-sizePx12">
        <span class="mb-1"><b>古树总数</b></span>
        <div class="rowSE">
          <span class="group-num"><b>5,018</b></span>
          <span class="group-num-text"><b>起</b></span>
        </div>
        <div class="group-desc mt">
          <span>较上个月</span>
          <span>
            <top class="icon" />
            9.4%
          </span>
        </div>
      </div>
      <div class="group-item font-sizePx12">
        <span class="mb-1"><b>古树总数</b></span>
        <div class="rowSE">
          <span class="group-num"><b>5,018</b></span>
          <span class="group-num-text"><b>起</b></span>
        </div>
        <div class="group-desc mt">
          <span>较上个月</span>
          <span style="color: #f56c6c">
            <bottom class="icon" />
            9.4%
          </span>
        </div>
      </div>
      <div class="group-item font-sizePx12">
        <span class="mb-1"><b>古树总数</b></span>
        <div class="rowSE">
          <span class="group-num"><b>5,018</b></span>
          <span class="group-num-text"><b>起</b></span>
        </div>
        <div class="group-desc mt">
          <span>较上个月</span>
          <span>
            <top class="icon" />
            9.4%
          </span>
        </div>
      </div>
    </div>
    <distribution></distribution>
    <abnormal></abnormal>
  </el-card>
</template>

<script setup>
import { Top, Bottom } from '@element-plus/icons-vue'
import Abnormal from './components/abnormal.vue'
import Distribution from './components/distribution.vue'
</script>

<style lang="scss" scoped>
.widthPC-45 {
  height: calc(100vh - 34.5px - 10px * 2);
}
.title-logo {
  width: 30px;
}

.group-item {
  width: 110px;
}
.group-num {
  font-size: 26px;
}
.group-desc {
  .icon {
    width: 12px;
    height: 12px;
    margin-top: -2px;
    margin-right: -3px;
    vertical-align: middle;
  }
  span:nth-child(1) {
    color: #666;
  }
  span:nth-child(2) {
    color: #67c23a;
  }
}
:deep(.el-card__header) {
  border: none !important;
}
:deep(.el-card__body) {
  padding-top: 0 !important;
}
</style>
