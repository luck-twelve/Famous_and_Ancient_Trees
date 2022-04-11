<template>
  <el-row :gutter="20">
    <el-col v-for="item in options" :key="item" :span="6">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.backImg" class="image" />
        <div style="padding: 14px">
          <span>{{ item.title }}</span>
          <div class="bottom">
            <div class="desc">{{ item.desc }}</div>
            <el-button type="text" class="button" @click="handleClick(item)">详情</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <curing-dialog :visible="visible" :type="type" @handle-close="handleClose"></curing-dialog>
</template>

<script setup>
import { ref } from 'vue'
import CuringDialog from './curing-dialog.vue'

const visible = ref(false)
const type = ref('')

const options = [
  {
    title: '春季养护技术措施及要求',
    desc: '2月 ~ 5月',
    backImg: `http://ywcd.cc/wp-content/uploads/2022/03/1647500963-spring.png`,
    type: 'spring'
  },
  {
    title: '夏季养护技术措施及要求',
    desc: '5月 ~ 8月',
    backImg: `http://ywcd.cc/wp-content/uploads/2022/03/1647500963-summer.png`,
    type: 'summer'
  },
  {
    title: '秋季养护技术措施及要求',
    desc: '8月 ~ 11月',
    backImg: `http://ywcd.cc/wp-content/uploads/2022/03/1647500962-autumn.png`,
    type: 'autumn'
  },
  {
    title: '冬季养护技术措施及要求',
    desc: '11月 ~ 2月',
    backImg: `http://ywcd.cc/wp-content/uploads/2022/03/1647500963-winter.png`,
    type: 'winter'
  }
]

// 详情
const handleClick = (val) => {
  visible.value = true
  type.value = val.type
}

// 关闭弹窗
const handleClose = () => {
  visible.value = false
}
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
  height: 237.5px;
  display: block;
}
</style>
