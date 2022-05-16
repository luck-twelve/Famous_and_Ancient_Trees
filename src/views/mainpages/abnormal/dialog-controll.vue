<template>
  <div class="ctr-dialog">
    <el-dialog v-model="visible" title="异常处理" width="450px" :before-close="handleClose">
      <el-form v-if="visible" :model="state.formData" label-width="100px">
        <el-form-item v-if="state.isControll" label="处理结果">
          <el-radio-group v-model="state.radio">
            <el-radio label="finish">已完成</el-radio>
            <el-radio label="change">更换处理人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-else label="处理方式">
          <el-radio-group v-model="state.radio">
            <el-radio label="resolve">接受</el-radio>
            <el-radio label="reject">不予处理</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="state.radio == 'resolve' || state.radio == 'change'" label="指派给">
          <span v-if="state.formData.resolve_user" style="padding: 0 10px">{{ state.formData.resolve_user }}</span>
          <el-button
            type="text"
            :icon="state.formData.resolve_user ? Switch : User"
            @click="state.workerVisible = true"
          >
            <span v-if="state.formData.resolve_user">重新选择</span>
            <span v-else>选择</span>
          </el-button>
        </el-form-item>
        <el-form-item v-if="state.radio == 'resolve'" label="预计完成时间">
          <el-select v-model="state.formData.expect_finish_time" placeholder="请选择">
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="state.radio == 'reject'" label="拒绝原因">
          <el-input v-model="state.formData.reject_reason" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleCommit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <worker-dialog
    v-if="state.workerVisible"
    v-model:visible="state.workerVisible"
    @before-close="state.workerVisible = false"
    @comfirm="
      (val) => {
        state.formData.resolve_user = val.real_name || val.username
      }
    "
  ></worker-dialog>
</template>

<script setup>
import { Switch, User } from '@element-plus/icons-vue'
import { reactive, toRefs, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import WorkerDialog from './dialog-worker.vue'
import { controllAbnormalReq } from '@/api/abnormal'

const props = defineProps({
  visible: {
    require: true,
    default: false,
    type: Boolean
  },
  rowData: {
    require: true,
    type: Object,
    default() {
      return {}
    }
  },
  isControll: {
    type: Boolean,
    default: false
  }
})
//导出属性到页面中使用
let { visible } = toRefs(props)

const state = reactive({
  radio: '',
  formData: {
    expect_finish_time: ''
  },
  workerVisible: false
})

const emit = defineEmits(['beforeClose', 'submit'])
const handleClose = () => {
  state.radio = ''
  state.formData.resolve_user = ''
  state.formData.expect_finish_time = ''
  state.formData.reject_reason = ''
  emit('beforeClose')
}
// 提交
const handleCommit = () => {
  if ((state.radio == 'resolve' || state.radio == 'change') && !state.formData.resolve_user) {
    ElMessage({ message: '请选择处理人员', type: 'warning' })
    return
  } else if (state.radio == 'reject' && !state.formData.reject_reason) {
    ElMessage({ message: '请输入拒绝原因', type: 'warning' })
    return
  }
  controllAbnormalReq(
    Object.assign(state.formData, {
      id: state.rowData.id,
      tree_id: state.rowData.tree_id,
      status: state.radio
    })
  ).then(({ data }) => {
    console.log(data)
    emit('submit')
  })
}

const timeOptions = [
  { label: '时间不定', value: '' },
  { label: '1天后', value: '1' },
  { label: '3天后', value: '3' },
  { label: '7天后', value: '7' },
  { label: '15天后', value: '15' },
  { label: '30天后', value: '30' }
]

watchEffect(() => {
  state.rowData = props.rowData
  state.isControll = props.isControll
})
</script>

<style lang="scss" scoped>
// .ctr-dialog {
//   &:deep(.el-dialog) {
//     margin: 10px auto 0 auto !important;
//   }
// }
</style>
