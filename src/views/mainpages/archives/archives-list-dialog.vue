<template>
  <el-dialog
    v-if="visable"
    v-model="visable"
    :title="dialogType === 'add' ? '新增档案' : '编辑信息'"
    width="800px"
    :before-close="handleClose"
  >
    <el-form v-if="visable" ref="dialogForm" :model="form" label-width="100px" style="padding-right: 20px">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="treeName" label="树名" :rules="formRulesMixin.isNotNull">
            <el-input v-model="form.treeName" maxlength="20" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="treeType" label="树种" :rules="formRulesMixin.isNotNull">
            <el-input v-model="form.treeType" maxlength="50" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="treeAge" label="树龄" :rules="formRulesMixin.isNotNull">
            <el-input v-model="form.treeAge" maxlength="5" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="treeLocation" label="地理位置" :rules="formRulesMixin.isNotNull">
            <el-input v-model="form.treeLocation" maxlength="250" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="treeAdminister" label="责任单位" :rules="formRulesMixin.isNotNull">
            <el-input v-model="form.treeAdminister" maxlength="250" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="treeHistoryLegend" label="历史传说" :rules="formRulesMixin.isNotNull">
            <el-input v-model="form.treeHistoryLegend" maxlength="250" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleCommit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, toRefs, watch, getCurrentInstance } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { addArchivesReq, updateArchivesReq } from '@/api/archives'
let { proxy } = getCurrentInstance()

/**
 * form表单
 */
const form = reactive({
  tree_id: '',
  treeName: '',
  treeType: '',
  treeAge: 0,
  treeLocation: '',
  treeAdminister: '',
  treeHistoryLegend: ''
})

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
    if (val && dialogData.value) {
      const { tree_id, treeName, treeType, treeAge, treeLocation, treeAdminister, treeHistoryLegend } = dialogData.value
      form.tree_id = tree_id
      form.treeName = treeName
      form.treeType = treeType
      form.treeAge = treeAge
      form.treeLocation = treeLocation
      form.treeAdminister = treeAdminister
      form.treeHistoryLegend = treeHistoryLegend
    }
  },
  { immediate: true }
)
let { visable } = toRefs(state)

const emit = defineEmits(['update:dialogVisible', 'success'])
const handleClose = () => {
  form.tree_id = ''
  form.treeName = ''
  form.treeType = ''
  form.treeAge = 0
  form.treeLocation = ''
  form.treeAdminister = ''
  form.treeHistoryLegend = ''
  emit('update:dialogVisible', false)
}
const handleCommit = () => {
  proxy.$refs['dialogForm'].validate((valid) => {
    if (valid) {
      let action = addArchivesReq
      if (dialogType.value === 'edit') {
        action = updateArchivesReq
      }
      action(form).then(({ data }) => {
        if (data.code === 200) {
          ElMessage({ message: data.msg, type: 'success' })
          emit('success')
          handleClose()
        } else {
          ElMessage({ message: data.msg, type: 'error' })
        }
      })
    } else {
      return false
    }
  })
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  /* overflow: hidden; */
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
</style>
