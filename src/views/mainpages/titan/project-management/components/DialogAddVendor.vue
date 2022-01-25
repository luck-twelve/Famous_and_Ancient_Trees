<template>
  <el-dialog v-if="visable" v-model="visable" title="添加厂商" width="70%" :before-close="handleClose">
    <el-form ref="formRef" :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="厂商名称">
            <el-input v-model="form.name" placeholder="请输入厂商名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厂商类型">
            <el-select v-model="form.region">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="tt-form-item" label="主域名&#10;每行一个&#10;或逗号分隔">
        <el-input
          v-model="form.desc"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          placeholder="abc.com&#10;abc.cn&#10;注意此处是添加主域名，不是子域名"
        ></el-input>
      </el-form-item>
      <el-form-item class="tt-form-item" label="IP列表&#10;每行一个&#10;或逗号分隔">
        <el-input
          v-model="form.desc"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 5 }"
          placeholder="支持如下3中格式&#10;10.1.1.1&#10;192.168.1.1/24 注:掩码不能小于22&#10;1.1.1.1-1.1.1.255"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, toRefs, watch } from 'vue'
const props = defineProps({
  dialogVisible: {
    require: true,
    default: false,
    type: Boolean
  }
})
const { dialogVisible } = toRefs(props)
const state = reactive({
  visable: dialogVisible.value
})
let { visable } = toRefs(state)
watch(
  dialogVisible,
  (val) => {
    state.visable = val
  },
  { immediate: true }
)
const emit = defineEmits(['update:dialogVisible'])
const handleClose = () => {
  emit('update:dialogVisible', false)
}

/**
 * form表单
 */
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
</script>

<style lang="scss" scoped>
.tt-form-item:deep(.el-form-item__label) {
  white-space: pre-wrap;
  text-align: right;
  line-height: 20px;
}
</style>
