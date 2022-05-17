<template>
  <div class="ab-dialog">
    <el-dialog v-model="visible" title="异常上报" width="450px" :before-close="handleClose">
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  visible: {
    require: true,
    default: false,
    type: Boolean
  }
})
//导出属性到页面中使用
let { visible } = toRefs(props)

const emit = defineEmits(['beforeClose', 'submit'])
const handleClose = () => {
  emit('beforeClose')
}

const handleSubmit = () => {
  emit('submit')
  handleClose()
}
</script>
