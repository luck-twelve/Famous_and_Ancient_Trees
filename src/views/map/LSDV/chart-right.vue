<template>
  <el-card shadow="always" class="widthPC-45">
    <template #header>
      <div class="rowSS">
        <img src="@/assets/LSDV_images/analysis_r.png" class="title-logo" />
        <div class="ml-1">
          <h4><b>古树资源</b></h4>
          <span class="font-sizePx12">Ancient tree resources</span>
        </div>
      </div>
    </template>
    <div class="rowBS">
      <div class="group-item font-sizePx12">
        <span class="mb-1">
          <b>{{ new Date().getFullYear() }}年古树总数</b>
        </span>
        <div class="rowSE">
          <span class="group-num">
            <b>{{ state.treeNumbers }}</b>
          </span>
          <span class="group-num-text"><b>颗</b></span>
        </div>
        <div class="group-desc mt">
          <span>较去年</span>
          <span>
            <top class="icon" />
            {{ state.treePercent }}
          </span>
        </div>
      </div>
      <div class="group-item font-sizePx12">
        <span class="mb-1">
          <b>{{ new Date().getFullYear() }}年树种总数</b>
        </span>
        <div class="rowSE">
          <span class="group-num">
            <b>{{ state.speciesNumbers }}</b>
          </span>
          <span class="group-num-text"><b>种</b></span>
        </div>
        <div class="group-desc mt">
          <span>较去年</span>
          <span>
            <top class="icon" />
            {{ state.speciesPercent }}
          </span>
        </div>
      </div>
      <div class="group-item font-sizePx12">
        <span class="mb-1">
          <b>{{ new Date().getMonth() + 1 }}月份古树异常情况</b>
        </span>
        <div class="rowSE">
          <span class="group-num">
            <b>{{ state.abnormalNumbers }}</b>
          </span>
          <span class="group-num-text"><b>起</b></span>
        </div>
        <div class="group-desc mt">
          <span>较上个月</span>
          <span style="color: #f56c6c">
            <top v-if="state.abnormalIsRise" class="icon" />
            <bottom v-else class="icon" />
            {{ state.abnormalPercent }}
          </span>
        </div>
      </div>
    </div>
    <distribution></distribution>
    <abnormal></abnormal>
  </el-card>
</template>

<script setup>
import { Top, Bottom } from '@element-plus/icons-vue'
import Abnormal from './components/abnormal.vue'
import Distribution from './components/distribution.vue'
import { onMounted, reactive } from 'vue'
import { getArchivesNumberEYReq, getSpeciesNumberEYReq } from '@/api/archives'
import { getAbnormalNumberTMReq, getAbnormalNumberLMReq } from '@/api/abnormal'

const state = reactive({
  treeNumbers: 0, // 全年古树总数
  treePercent: '0%',
  speciesNumbers: 0, // 全年树种总数
  speciesPercent: '0%',
  abnormalNumbers: 0, // 新增异常情况
  abnormalPercent: 0,
  abnormalIsRise: false // 趋势
})

const initTreeNumberEY = async () => {
  const thisYear = await getArchivesNumberEYReq('2022')
  const lastYear = await getArchivesNumberEYReq('2021')
  const thisYearNumber = thisYear.data.data
  const lastYearNumber = lastYear.data.data
  state.treeNumbers = thisYearNumber
  let riseNumber = (thisYearNumber - lastYearNumber) / thisYearNumber
  state.treePercent = (riseNumber * 100).toFixed(2) + '%'
}

const initSpeciesNumberEY = async () => {
  const thisYear = await getSpeciesNumberEYReq('2022')
  const lastYear = await getSpeciesNumberEYReq('2021')
  const thisYearNumber = thisYear.data.data
  const lastYearNumber = lastYear.data.data
  state.speciesNumbers = thisYearNumber
  let riseNumber = (thisYearNumber - lastYearNumber) / thisYearNumber
  state.speciesPercent = (riseNumber * 100).toFixed(2) + '%'
}

const initAbnormalNumberEY = async () => {
  const thisMonth = await getAbnormalNumberTMReq()
  const lastMonth = await getAbnormalNumberLMReq()
  const thisMonthNumber = thisMonth.data.data
  const lastMonthNumber = lastMonth.data.data
  state.abnormalIsRise = thisMonthNumber > lastMonthNumber
  state.abnormalNumbers = thisMonthNumber
  state.abnormalPercent = Math.abs(thisMonthNumber - lastMonthNumber)
}

onMounted(() => {
  initTreeNumberEY()
  initSpeciesNumberEY()
  initAbnormalNumberEY()
})
</script>

<style lang="scss" scoped>
.widthPC-45 {
  height: calc(100vh - 34.5px - 10px * 2);
}
.title-logo {
  width: 30px;
}

.group-item {
  width: 110px;
}
.group-num {
  font-size: 26px;
}
.group-desc {
  .icon {
    width: 12px;
    height: 12px;
    margin-top: -2px;
    margin-right: -3px;
    vertical-align: middle;
  }
  span:nth-child(1) {
    color: #666;
  }
  span:nth-child(2) {
    color: #67c23a;
  }
}
:deep(.el-card__header) {
  border: none !important;
}
:deep(.el-card__body) {
  padding-top: 0 !important;
}
</style>
