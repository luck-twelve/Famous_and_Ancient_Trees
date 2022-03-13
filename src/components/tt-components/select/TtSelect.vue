<template>
  <div class="el-input el-input-group tt-input-group--prepend">
    <div class="el-input-group__prepend">{{ label }}</div>
    <el-select v-model="model" clearable @change="handleClick">
      <el-option v-for="item in options" :key="item" :label="item[opLabel]" :value="item[opValue]"></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    require: true,
    default: '',
    type: String
  },
  label: {
    require: true,
    default: '',
    type: String
  },
  options: {
    require: true,
    default: () => {
      return []
    },
    type: Array
  },
  clearable: {
    default: true,
    type: Boolean
  },
  opLabel: {
    default: 'label',
    type: String
  },
  opValue: {
    default: 'value',
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])

const model = ref(props.modelValue)
const handleClick = (val) => {
  emit('update:modelValue', val)
}
</script>

<style scoped>
.tt-input-group--prepend:deep(.el-input__inner) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
