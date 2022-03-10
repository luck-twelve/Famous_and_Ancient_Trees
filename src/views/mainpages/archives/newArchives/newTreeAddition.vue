<template>
  <el-descriptions :column="2" border>
    <el-descriptions-item label="特殊状况描述" :span="2">
      <el-input v-model="data.special_conditions" :rows="4" type="textarea"></el-input>
    </el-descriptions-item>
    <el-descriptions-item label="保护现状及建议" :span="2">
      <el-input v-model="data.status" :rows="4" type="textarea"></el-input>
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
