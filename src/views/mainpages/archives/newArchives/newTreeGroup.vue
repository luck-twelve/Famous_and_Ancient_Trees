<template>
  <div class="form-container">
    <el-descriptions title="古树群调查表" :column="1" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <user />
            </el-icon>
            <span>单位</span>
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
            <span>调查号</span>
          </div>
        </template>
        <el-input v-model="form.contact"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>权属</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>位置</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>区域</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>类别</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>面积</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>古树株数</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>主要树种</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>目的保护树种</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>平均树龄</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>郁闭度</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>林分平均高度</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>林分平均胸围（地围）</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>立地条件</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>土层厚度</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>下木</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <location-information />
            </el-icon>
            <span>密度</span>
          </div>
        </template>
        <el-input v-model="form.happenAddr"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <tickets />
            </el-icon>
            <span>经营活动情况</span>
          </div>
        </template>
        <el-input v-model="form.abCondition" :rows="3" type="textarea"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <tickets />
            </el-icon>
            <span>管护单位或个人</span>
          </div>
        </template>
        <el-input v-model="form.abCondition" :rows="3" type="textarea"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <tickets />
            </el-icon>
            <span>管护现状</span>
          </div>
        </template>
        <el-input v-model="form.abCondition" :rows="3" type="textarea"></el-input>
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
