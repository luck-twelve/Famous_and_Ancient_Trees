<template>
  <div class="verify-dialog">
    <el-dialog v-model="visible" title="驳回原因" width="500px" :before-close="handleClose">
      <el-form v-if="visible" :model="state.form">
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-input v-model="state.form.reason" type="textarea" :rows="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    require: true,
    default: false,
    type: Boolean
  }
})
const { visible } = toRefs(props)

const state = reactive({
  form: {}
})

const emit = defineEmits(['handleClose', 'handleSubmit'])

const handleClose = () => {
  state.form.reason = ''
  emit('handleClose')
}
const handleSubmit = () => {
  if (!state.form.reason) {
    ElMessage({ message: '请填写驳回原因', type: 'warning' })
    return
  }
  emit('handleSubmit', state.form.reason)
}
</script>

<style scoped>
.verify-dialog:deep(.el-dialog__body) {
  padding: 10px var(--el-dialog-padding-primary);
}
.el-form-item {
  margin-bottom: 0;
}
</style>
