<template>
  <div class="form-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="古树基本资料" name="base">
        <new-tree-base></new-tree-base>
      </el-tab-pane>
      <el-tab-pane label="古树生长资料" name="grow">
        <new-tree-grow></new-tree-grow>
      </el-tab-pane>
      <el-tab-pane label="古树附加资料" name="addition">
        <new-tree-addition></new-tree-addition>
      </el-tab-pane>
      <el-tab-pane v-if="type == 'look'" label="其他资料" name="other">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="创建人">
            {{ data.create_user }}
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ data.create_time }}
          </el-descriptions-item>
          <el-descriptions-item label="更新人">
            {{ data.update_user }}
          </el-descriptions-item>
          <el-descriptions-item label="更新时间">
            {{ data.update_time }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, inject, toRefs } from 'vue'
import newTreeBase from './newTreeBase.vue'
import newTreeGrow from './newTreeGrow.vue'
import newTreeAddition from './newTreeAddition.vue'
const activeName = ref('base')
const dialogInfo = reactive(inject('dialogInfo'))
const { type, data } = toRefs(dialogInfo)
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .footer-btn {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  &:deep(.el-descriptions__label) {
    width: 120px;
  }
}
</style>
