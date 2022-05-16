<template>
  <div class="ttDialog">
    <div class="top-20">
      <el-dialog v-model="visible" title="档案管理" width="70%" readonly :before-close="handleClose">
        <el-scrollbar>
          <new-tree v-if="visible"></new-tree>
        </el-scrollbar>
        <template #footer>
          <span class="dialog-footer">
            <el-button v-if="type !== 'look'" @click="handleClose">取 消</el-button>
            <el-button v-if="type === 'add' || type === 'edit'" type="primary" @click="handleSave">保 存</el-button>
            <el-button v-if="type === 'add' || type === 'edit'" type="primary" @click="handleSubmit">提 交</el-button>
            <el-button v-if="type === 'verify'" type="danger" @click="handleVerifyNo">驳 回</el-button>
            <el-button v-if="type === 'verify'" type="primary" @click="handleVerifyYes">通 过</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
  <archives-verify-dialog
    v-model:visible="showVerify"
    @handle-close="handleVerifyClose"
    @handle-submit="handleVerifySubmit"
  ></archives-verify-dialog>
</template>

<script setup>
import { toRefs, reactive, inject } from 'vue'
import NewTree from './newArchives/newTree.vue'
import ArchivesVerifyDialog from './archives-verify-dialog.vue'
const props = defineProps({
  visible: {
    require: true,
    default: false,
    type: Boolean
  }
})
const dialogInfo = reactive(inject('dialogInfo'))
const { visible } = toRefs(props)
const { type } = toRefs(dialogInfo)

const emit = defineEmits(['handleClose', 'handleSave', 'handleSubmit', 'handleVerifyNo', 'handleVerifyYes'])

const handleClose = () => {
  emit('handleClose')
}
// 保存档案
const handleSave = () => {
  emit('handleSave')
}
// 提交档案
const handleSubmit = () => {
  emit('handleSubmit')
}
// 驳回档案
const state = reactive({
  showVerify: false
})
const handleVerifyNo = () => {
  state.showVerify = true
}
const handleVerifyClose = () => {
  state.showVerify = false
}
const handleVerifySubmit = (val) => {
  emit('handleVerifyNo', {
    id: dialogInfo.data.id,
    reason: val
  })
  state.showVerify = false
}
const { showVerify } = toRefs(state)
// 通过审批
const handleVerifyYes = () => {
  emit('handleVerifyYes', dialogInfo.data.id)
}
</script>
