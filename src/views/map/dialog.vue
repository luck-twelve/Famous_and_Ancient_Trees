<template>
  <div class="ttDialog">
    <el-dialog v-model="visible" title="异常上报" width="450px" :before-close="handleClose">
      <el-form v-if="visible" ref="dialogForm" :model="state.formData" label-width="80px">
        <el-form-item label="异常情况" prop="ab_condition" :rules="formRulesMixin.isNotNull">
          <el-input v-model="state.formData.ab_condition" :rows="2" type="textarea" />
        </el-form-item>
        <el-form-item label="可能原因" prop="reason">
          <el-input v-model="state.formData.reason" :rows="2" type="textarea" />
        </el-form-item>
        <el-form-item label="期望解决" prop="resolve">
          <el-input v-model="state.formData.resolve" :rows="2" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs, getCurrentInstance } from 'vue'
import { updateAbnormalReq } from '@/api/abnormal'
let { proxy } = getCurrentInstance()

const props = defineProps({
  visible: {
    require: true,
    type: Boolean,
    default: false
  },
  treeInfo: {
    type: Object,
    default() {
      return {}
    }
  }
})
//导出属性到页面中使用
let { visible } = toRefs(props)

const state = reactive({
  formData: {}
})

const emit = defineEmits(['beforeClose', 'submit'])
const handleClose = () => {
  emit('beforeClose')
}

const handleSubmit = () => {
  proxy.$refs['dialogForm'].validate((valid) => {
    if (valid) {
      updateAbnormalReq(
        Object.assign(state.formData, {
          tree_id: props.treeInfo.id,
          tree_name: props.treeInfo.tree_nameZh,
          longitude: props.treeInfo.longitude,
          latitude: props.treeInfo.latitude
        })
      ).then(() => {
        emit('submit')
      })
    }
  })
}
</script>
