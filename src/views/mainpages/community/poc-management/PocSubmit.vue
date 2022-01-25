<template>
  <el-form ref="formRef" :model="form" label-width="120px">
    <el-form-item class="tt-form-item" label="资产列表&#10;①每行一个&#10;②逗号分隔">
      <el-input
        v-model="form.asset_list"
        type="textarea"
        :rows="5"
        placeholder="支持域名、IP、URL资产，示例如下:&#10;aaa.com&#10;a.bbb.com&#10;192.168.1.1&#10;http://aaa.bbb.com/"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-space>
        <el-button type="primary">一键分拣</el-button>
        <span>提取资产中的主域名、子域名、IP、URL</span>
      </el-space>
    </el-form-item>
    <el-form-item label="主域名">
      <el-input v-model="form.pri_name" type="textarea" :rows="5" disabled></el-input>
    </el-form-item>
    <el-form-item label="子域名">
      <el-input v-model="form.sub_name" type="textarea" :rows="5" disabled></el-input>
    </el-form-item>
    <el-form-item label="IP">
      <el-input v-model="form.ip" type="textarea" :rows="5" disabled></el-input>
    </el-form-item>
    <el-form-item label="URL">
      <el-input v-model="form.url" type="textarea" :rows="5" disabled></el-input>
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
