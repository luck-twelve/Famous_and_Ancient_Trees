<template>
  <div class="ttDialog">
    <div class="top-20">
      <el-dialog v-model="visible" title="档案管理" width="70%" :before-close="handleClose">
        <el-scrollbar>
          <new-tree v-if="visible"></new-tree>
        </el-scrollbar>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleSave">保 存</el-button>
            <el-button type="primary" @click="handleSubmit">提 交</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import NewTree from './newArchives/newTree.vue'

const props = defineProps({
  visible: {
    require: true,
    default: false,
    type: Boolean
  }
})
const { visible } = toRefs(props)

const emit = defineEmits(['handleClose', 'handleSave', 'handleSubmit'])
const handleClose = () => {
  emit('handleClose')
}

const handleSave = () => {
  emit('handleSave')
}
const handleSubmit = () => {
  emit('handleSubmit')
}
</script>
