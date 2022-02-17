<template>
  <el-tabs v-model="activeName" class="demo-tabs" type="border-card" @tab-click="handleTab">
    <el-tab-pane label="名木古树" name="tree">
      <new-tree></new-tree>
    </el-tab-pane>
    <el-tab-pane label="古树群" name="treeGroup">
      <new-tree-group></new-tree-group>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import newTree from './newTree.vue'
import newTreeGroup from './newTreeGroup.vue'

const activeName = ref('tree')

const handleTab = (tab: string, event: Event) => {
  // console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  /* background-color: #f4f5f7; */
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
