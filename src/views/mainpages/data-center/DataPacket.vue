<template>
  <el-tabs type="border-card">
    <el-tab-pane label="数据包搜索">
      <search-package></search-package>
    </el-tab-pane>
    <el-tab-pane label="查询语法说明">
      <search-grammar></search-grammar>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import SearchPackage from './components/SearchPackage.vue'
import SearchGrammar from './components/SearchGrammar.vue'
</script>
