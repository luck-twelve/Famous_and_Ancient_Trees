<template>
  <div class="form-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="古树基本资料" name="base">
        <new-tree-base></new-tree-base>
      </el-tab-pane>
      <el-tab-pane label="古树生长资料" name="grow">
        <new-tree-grow></new-tree-grow>
      </el-tab-pane>
      <el-tab-pane label="古树附加资料" name="addition">
        <new-tree-addition></new-tree-addition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { addArchivesTreeReq, updateArchivesTreeReq } from '@/api/archives'
import newTreeBase from './newTreeBase.vue'
import newTreeGrow from './newTreeGrow.vue'
import newTreeAddition from './newTreeAddition.vue'
let { proxy } = getCurrentInstance()

const activeName = ref('base')

let form = inject('dialogInfo')
const emit = defineEmits(['success'])
const handleSubmit = () => {
  let checkList = []
  Object.keys(form).forEach((item) => {
    if (item !== 'archive_id') {
      checkList.push(checkForm(item))
    }
  })
  Promise.all(checkList)
    .then(() => {
      if (!form.archive_id) {
        addArchivesTreeReq(form).then(({ data }) => {
          if (data.flag) {
            emit('success')
          }
        })
      } else {
        updateArchivesTreeReq(form).then(({ data }) => {
          if (data.flag) {
            emit('success')
          }
        })
      }
    })
    .catch(() => {
      ElMessage({ message: '请填写完整表单', type: 'error' })
    })
}
// 表单验证
const checkForm = (formRef) => {
  return new Promise((resolve, reject) => {
    proxy.$refs[formRef].validate((valid) => {
      if (valid) {
        resolve()
      } else reject()
    })
  })
}
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .footer-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  &:deep(.el-descriptions__label) {
    width: 120px;
  }
}
</style>
