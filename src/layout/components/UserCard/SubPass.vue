<template>
  <el-dialog v-model="dialogVisible" title="修改密码" :before-close="handleClose">
    <el-form :model="form" label-width="120px">
      <el-form-item label="Promotion name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Zones">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai"></el-option>
          <el-option label="Zone No.2" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleClose">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  }
})
const { dialogVisible } = toRefs(props)
const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
}

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
