<template>
  <div class="ttDialog">
    <div class="top-20">
      <el-dialog v-model="visable" title="档案管理" width="70%" :before-close="handleClose">
        <el-scrollbar>
          <new-tree v-if="visable" :data-source="dialogData" @success="successCallback"></new-tree>
        </el-scrollbar>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleSubmit">保 存</el-button>
            <el-button type="primary" @click="handleSubmit">提 交</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, watch } from 'vue'
import NewTree from './newArchives/newTree.vue'

const props = defineProps({
  dialogVisible: {
    require: true,
    default: false,
    type: Boolean
  },
  dialogType: {
    require: true,
    default: 'add', // add-edit
    type: String
  },
  dialogData: {
    default: () => {},
    type: Object
  }
})
const { dialogVisible, dialogType, dialogData } = toRefs(props)
const state = reactive({
  visable: dialogVisible.value
})
watch(
  dialogVisible,
  (val) => {
    state.visable = val
  },
  { immediate: true }
)
let { visable } = toRefs(state)

const emit = defineEmits(['update:dialogVisible', 'success'])
const handleClose = () => {
  emit('update:dialogVisible', false)
}
const successCallback = () => {
  emit('success')
  handleClose()
}
</script>

<style lang="scss" scoped>
.drawer-wrap {
  height: 100%;
  cursor: default;
  &:deep(.el-drawer__body) {
    height: 100%;
    padding: 20px 0 60px 20px;
  }
  &:deep(.el-drawer__header) {
    margin-bottom: 0;
  }
}
</style>
