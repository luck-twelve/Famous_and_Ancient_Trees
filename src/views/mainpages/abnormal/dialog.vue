<template>
  <div class="ab-dialog">
    <el-dialog v-model="visible" title="选择异常古树" width="70%" :before-close="handleClose">
      <archives-list v-if="visible" is-dialog @selection-change="handleSelectionChange"></archives-list>
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
import archivesList from '../archives/archives-list.vue'
import { ref, toRefs } from 'vue'

const props = defineProps({
  visible: {
    require: true,
    default: false,
    type: Boolean
  }
})
//导出属性到页面中使用
let { visible } = toRefs(props)

const checkData = ref([])

const emit = defineEmits(['beforeClose', 'submit'])
const handleClose = () => {
  emit('beforeClose')
}

const handleSelectionChange = (val) => {
  checkData.value = val
}

const handleSubmit = () => {
  emit('submit', checkData.value)
  handleClose()
}
</script>

<style lang="scss" scoped>
.ab-dialog {
  &:deep(.el-dialog) {
    margin: 70px auto 0 auto !important;
  }
}
</style>
