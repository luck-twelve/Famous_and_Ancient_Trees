<template>
  <el-form ref="formRef" :model="form" label-width="80px">
    <el-form-item label="产品名称">
      <el-input v-model="form.asset_list" placeholder="请输入产品名称"></el-input>
    </el-form-item>
    <el-form-item label="识别方式">
      <el-input v-model="form.asset_list" placeholder="多选框"></el-input>
    </el-form-item>
    <el-form-item class="tt-form-item" label="首页源码&#10;关键字&#10;每行一个">
      <el-input v-model="form.asset_list" type="textarea" :rows="4" placeholder="每行关键字将采用and匹配"></el-input>
    </el-form-item>
    <el-form-item class="tt-form-item" label="示例站点&#10;每行一个">
      <el-input v-model="form.asset_list" type="textarea" :rows="4" placeholder="尽量提供多个示例站点"></el-input>
    </el-form-item>
    <el-form-item label="开发单位">
      <el-input v-model="form.asset_list" placeholder="如能找到该产品的开发单位，则写上"></el-input>
    </el-form-item>
    <el-form-item label="行业类别">
      <el-input v-model="form.asset_list" placeholder="如：办公OA"></el-input>
    </el-form-item>
    <el-form-item label="指纹等级">
      <el-input v-model="form.asset_list" placeholder="下拉列表"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">确认提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { toRefs, reactive, onBeforeMount } from 'vue'

/**
 * 表单
 */
const form = reactive({
  asset_list: '',
  pri_name: '',
  sub_name: '',
  ip: '',
  url: ''
})
const handleSubmit = () => {
  console.log(form)
}
</script>

<style scoped lang="scss">
.tt-form-item:deep(.el-form-item__label) {
  white-space: pre-wrap;
  text-align: right;
  line-height: 20px;
}
</style>
