<template>
  <div class="form-container">
    <el-descriptions title="异常上报" :column="3" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <user />
            </el-icon>
            <span>姓名</span>
          </div>
        </template>
        <el-input v-model="form.username"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <iphone />
            </el-icon>
            <span>联系方式</span>
          </div>
        </template>
        <el-input v-model="form.contact"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <clock />
            </el-icon>
            <span>发生时间</span>
          </div>
        </template>
        <el-date-picker
          v-model="form.happenTime"
          type="datetime"
          value-format="YYYY-MM-DD hh:mm:ss"
          placeholder="请选择"
        ></el-date-picker>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>发生地点</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <tickets />
            </el-icon>
            <span>异常情况</span>
          </div>
        </template>
        <el-input v-model="form.abCondition" :rows="3" type="textarea"></el-input>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <warning />
            </el-icon>
            <span>原因分析</span>
          </div>
        </template>
        <el-input v-model="form.reasons" :rows="3" type="textarea"></el-input>
      </el-descriptions-item>
    </el-descriptions>
    <div class="footer-btn">
      <el-button type="primary" style="width: 160px" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { User, Iphone, Clock, LocationInformation, Tickets, Warning } from '@element-plus/icons-vue'
import { ref, toRefs, reactive, onBeforeMount } from 'vue'

/**
 * 表单
 */
const form = reactive({
  username: '',
  contact: '',
  happenTime: '',
  happenAddr: '',
  abCondition: '',
  reasons: ''
})
const handleSubmit = () => {
  console.log(form)
}
</script>

<style lang="scss" scoped>
.form-container {
  // max-width: 1000px;
  min-width: 400px;
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
.cell-item {
  display: flex;
  align-items: center;
}
.cell-item :first-child {
  margin-right: 6px;
}
</style>
