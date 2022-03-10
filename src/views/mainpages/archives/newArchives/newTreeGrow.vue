<template>
  <el-descriptions :column="2" border>
    <el-descriptions-item label="树龄" :span="2">
      <div class="rowSC">
        估测树龄：
        <el-input v-model="data.tree_ageEstimate" class="widthPx-100"></el-input>
        年
        <el-divider direction="vertical"></el-divider>
        真实树龄：
        <el-input v-model="data.tree_ageReal" class="widthPx-100"></el-input>
        年
        <el-divider direction="vertical"></el-divider>
        传说树龄：
        <el-input v-model="data.tree_ageLegend" class="widthPx-100"></el-input>
        年
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="树高">
      <div class="rowSC">
        <el-input v-model="data.tree_height" class="widthPx-200"></el-input>
        米
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="分布">
      <el-select v-model="data.tree_distribution" placeholder="请选择" class="widthPx-200">
        <el-option label="散生" value="GROW_SCATTERED"></el-option>
        <el-option label="群状" value="GROUP_SHAPE"></el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="林分平均胸围（地围）">
      <template #label>
        <div>林分平均胸围</div>
        （地围）
      </template>
      <div class="rowSC">
        <el-input v-model="data.ground_circumference" class="widthPx-200"></el-input>
        厘米
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="海拔">
      <div class="rowSC">
        <el-input v-model="data.crown_altitude" class="widthPx-150"></el-input>
        米
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="冠幅" :span="2">
      <div class="rowSC">
        东西：
        <el-input v-model="data.crown_widthEW" class="widthPx-130"></el-input>
        米
        <el-divider direction="vertical"></el-divider>
        南北：
        <el-input v-model="data.crown_widthNS" class="widthPx-130"></el-input>
        米
        <el-divider direction="vertical"></el-divider>
        平均：
        <el-input v-model="data.crown_widthAverage" class="widthPx-130"></el-input>
        米
      </div>
      <div class="rowSC mt-1">
        坡向：
        <el-select v-model="data.crown_slopeDirection" class="widthPx-150" placeholder="请选择">
          <el-option label="东" value="EAST"></el-option>
          <el-option label="西" value="WEST"></el-option>
          <el-option label="南" value="SOUTH"></el-option>
          <el-option label="北" value="NORTH"></el-option>
        </el-select>
        <el-divider direction="vertical"></el-divider>
        坡度：
        <el-input v-model="data.crown_slopeDegree" class="widthPx-120"></el-input>
        度
        <el-divider direction="vertical"></el-divider>
        坡位：
        <el-input v-model="data.crown_slopePosition" class="widthPx-120"></el-input>
        部
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="立地条件" :span="2">
      <div class="rowSC">
        土壤名称：
        <el-input v-model="data.site_soilName" class="widthPx-200"></el-input>
        <el-divider direction="vertical"></el-divider>
        紧密度：
        <el-select v-model="data.site_compactness" class="widthPx-200" placeholder="请选择">
          <el-option label="极紧密" value="TIGHT_QUITE"></el-option>
          <el-option label="紧密" value="TIGHT"></el-option>
          <el-option label="中等" value="MODERATE"></el-option>
          <el-option label="较疏松" value="LOOSE"></el-option>
          <el-option label="疏松" value="LOOSE_QUITE"></el-option>
        </el-select>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { reactive, inject, toRefs } from 'vue'
const form = reactive(inject('dialogInfo'))
const { data } = toRefs(form)
</script>

<style scoped>
.cell-item {
  display: flex;
  align-items: center;
}
.cell-item :first-child {
  margin-right: 6px;
}
.el-form-item {
  margin-bottom: 0;
}
</style>
