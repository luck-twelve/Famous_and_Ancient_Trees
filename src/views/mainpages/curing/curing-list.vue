<template>
  <el-row :gutter="20">
    <el-col v-for="item in options" :key="item" :span="6">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.backImg" class="image" />
        <div style="padding: 14px">
          <span>{{ item.title }}</span>
          <div class="bottom">
            <div class="desc">{{ item.desc }}</div>
            <el-button type="text" class="button">详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    title: '春季养护方案',
    desc: '春季养护方案',
    backImg: '@/assets/curing_images/spring.png'
  },
  {
    title: '夏季养护方案',
    desc: '夏季养护方案',
    backImg: '@/assets/curing_images/summer.png'
  },
  {
    title: '秋季养护方案',
    desc: '秋季养护方案',
    backImg: '@/assets/curing_images/autumn.png'
  },
  {
    title: '冬季养护方案',
    desc: '冬季养护方案',
    backImg: '@/assets/curing_images/winter.png'
  }
]

const currentDate = ref(new Date())
</script>

<style>
.desc {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
