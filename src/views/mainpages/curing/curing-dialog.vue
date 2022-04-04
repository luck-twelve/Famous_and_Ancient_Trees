<template>
  <el-dialog v-model="visible" title="Tips" width="30%" :before-close="handleClose">
    <span>{{ type }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="visible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { toRefs, watch } from 'vue'
const props = defineProps({
  visible: {
    require: true,
    default: false,
    type: Boolean
  },
  type: {
    default: '',
    type: String
  }
})
const { visible, type } = toRefs(props)

watch(visible)

const emit = defineEmits(['handleClose'])

const handleClose = () => {
  emit('handleClose')
}
</script>
