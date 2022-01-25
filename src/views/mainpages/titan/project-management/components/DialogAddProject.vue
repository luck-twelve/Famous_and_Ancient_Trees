<template>
  <el-dialog v-if="visable" v-model="visable" title="Tips" width="30%" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleClose">Confirm</el-button>
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
</script>
