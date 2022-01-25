<template>
  <div>
    <b>更新记录:</b>
    <el-timeline>
      <el-timeline-item
        v-for="item in logOptions"
        :key="item"
        hide-timestamp
        center
        :timestamp="`${item.logTime} ${item.logVersion}`"
        placement="top"
      >
        <el-card>
          <span>
            {{ item.logTime }}
            <em>{{ item.logVersion }}</em>
          </span>
          <pre>{{ item.logValue }}</pre>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import logs from './logs'
const logOptions = ref(null)
logOptions.value = logs
</script>

<style lang="scss" scoped>
.el-timeline {
  padding-right: 20px;
  margin-top: 10px;
}
.el-timeline-item {
  margin-left: -35px;
}
pre {
  margin: 10px 0;
  white-space: pre-wrap;
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
  line-height: 1.5em;
}
</style>
