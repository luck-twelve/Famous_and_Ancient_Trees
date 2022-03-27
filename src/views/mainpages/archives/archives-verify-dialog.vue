<template>
  <div class="verify-dialog">
    <el-dialog v-model="visible" title="驳回原因" width="500px" :before-close="handleClose">
      <el-form v-if="visible" :model="form">
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-input v-model="reason" type="textarea" :rows="4"></el-input>
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
import { ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    require: true,
    default: false,
    type: Boolean
  }
})
const { visible } = toRefs(props)

const reason = ref('')

const emit = defineEmits(['handleClose', 'handleSubmit'])

const handleClose = () => {
  emit('handleClose')
}
const handleSubmit = () => {
  if (!reason.value) {
    ElMessage({ message: '请填写驳回原因', type: 'error' })
    return
  }
  emit('handleSubmit', reason.value)
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
