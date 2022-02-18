<template>
  <div class="form-container">
    <el-descriptions title="古树群调查表" :column="2" border>
      <el-descriptions-item label="档案号">
        <el-input v-model="form.archive_id" class="widthPx-300"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="权属">
        <el-radio-group v-model="radioOwner">
          <el-radio label="STATE_OWNED">国有</el-radio>
          <el-radio label="COLLECTIVE">集体</el-radio>
          <el-radio label="PERSONAL">个人</el-radio>
          <el-radio label="OTHERS">其他</el-radio>
        </el-radio-group>
      </el-descriptions-item>
      <el-descriptions-item label="单位" :span="2">
        <div class="rowSC">
          <el-input v-model="form.company_province" class="widthPx-100"></el-input>
          省（市、区）
          <el-input v-model="form.company_city" class="widthPx-100"></el-input>
          市（地、州）
          <el-input v-model="form.company_district" class="widthPx-100"></el-input>
          区（市、区）
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="位置" :span="2">
        <div class="rowSC">
          东经：
          <el-input v-model="form.longitude_degree_start" class="widthPx-100"></el-input>
          度
          <el-input v-model="form.longitude_branch_start" class="widthPx-100"></el-input>
          分
          <el-input v-model="form.longitude_second_start" class="widthPx-100"></el-input>
          秒 至 东经：
          <el-input v-model="form.longitude_degree_end" class="widthPx-100"></el-input>
          度
          <el-input v-model="form.longitude_branch_end" class="widthPx-100"></el-input>
          分
          <el-input v-model="form.longitude_second_end" class="widthPx-100"></el-input>
          秒
        </div>
        <div class="rowSC">
          北纬：
          <el-input v-model="form.longitude_degree_start" class="widthPx-100"></el-input>
          度
          <el-input v-model="form.longitude_branch_start" class="widthPx-100"></el-input>
          分
          <el-input v-model="form.longitude_second_start" class="widthPx-100"></el-input>
          秒 至 北纬：
          <el-input v-model="form.longitude_degree_end" class="widthPx-100"></el-input>
          度
          <el-input v-model="form.longitude_branch_end" class="widthPx-100"></el-input>
          分
          <el-input v-model="form.longitude_second_end" class="widthPx-100"></el-input>
          秒
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="区域">
        <el-radio-group v-model="radioArea">
          <el-radio label="CITY">城市</el-radio>
          <el-radio label="COUNTRY_SIDE">农村</el-radio>
        </el-radio-group>
      </el-descriptions-item>
      <el-descriptions-item label="坐落">
        <el-radio-group v-model="radioLocation">
          <el-radio label="UNIT_COURTYYARD">单位庭院</el-radio>
          <el-radio label="PERSONAL_HOUSE">个人宅院</el-radio>
          <el-radio label="TEMPLE">寺院</el-radio>
          <el-radio label="OTHERS">其他</el-radio>
        </el-radio-group>
      </el-descriptions-item>
      <el-descriptions-item label="类别">
        <el-radio-group v-model="radioType">
          <el-radio label="ANCIENT">古树</el-radio>
          <el-radio label="FAMOUS">名木</el-radio>
        </el-radio-group>
      </el-descriptions-item>
      <el-descriptions-item label="分布">
        <el-radio-group v-model="radioDistribution">
          <el-radio label="GROW_SCATTERED">散生</el-radio>
          <el-radio label="GROUP_SHAPE">群状</el-radio>
        </el-radio-group>
      </el-descriptions-item>
      <el-descriptions-item label="面积">
        <div class="rowSC">
          <el-input v-model="form.tree_measureArea" class="widthPx-200"></el-input>
          公顷
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="古树株数">
        <div class="rowSC">
          <el-input v-model="form.tree_count" class="widthPx-200"></el-input>
          株
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="主要树种">
        <el-select v-model="form.tree_speciesMain" placeholder="请选择">
          <el-option label="松柏类" value="songbai"></el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="目的保护树种">
        <el-select v-model="form.tree_speciesProtect" placeholder="请选择">
          <el-option label="松柏类" value="songbai"></el-option>
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="平均树龄">
        <div class="rowSC">
          <el-input v-model="form.tree_ageAverage" class="widthPx-200"></el-input>
          年
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="郁闭度">
        <el-input v-model="form.tree_closure" class="widthPx-200"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="林分平局高度">
        <div class="rowSC">
          <el-input v-model="form.tree_heightAverage" class="widthPx-200"></el-input>
          米
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="林分平均胸围（地围）">
        <div class="rowSC">
          <el-input v-model="form.ground_circumference" class="widthPx-200"></el-input>
          厘米
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="立地条件" :span="2">
        <div class="rowSC">
          海拔：
          <el-input v-model="form.site_altitude" class="widthPx-120"></el-input>
          米
          <el-divider direction="vertical"></el-divider>
          坡向：
          <el-select v-model="form.site_slopeDirection" class="widthPx-130" placeholder="请选择">
            <el-option label="东" value="east"></el-option>
            <el-option label="西" value="west"></el-option>
            <el-option label="南" value="south"></el-option>
            <el-option label="北" value="north"></el-option>
          </el-select>
          <el-divider direction="vertical"></el-divider>
          坡度：
          <el-input v-model="form.site_slopeDegree" class="widthPx-120"></el-input>
          度
        </div>
        <div class="rowSC">
          土壤名称：
          <el-input v-model="form.site_soilName" class="widthPx-120"></el-input>
          <el-divider direction="vertical"></el-divider>
          紧密度：
          <el-input v-model="form.site_compactness" class="widthPx-120"></el-input>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="经营活动情况" :span="2">
        <el-input v-model="form.activities_conditions" :rows="3" type="textarea"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="管护单位或个人" :span="2">
        <el-input v-model="form.keeper"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="管护现状及建议" :span="2">
        <el-input v-model="form.status" :rows="3" type="textarea"></el-input>
      </el-descriptions-item>
    </el-descriptions>
    <div class="footer-btn">
      <el-button type="primary" style="width: 160px" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, reactive } from 'vue'

const radioArea = ref('') // 区域 - CITY / COUNTRY_SIDE
const radioLocation = ref('') // 坐落 - UNIT_COURTYYARD / PERSONAL_HOUSE / TEMPLE / OTHERS
const radioType = ref('') // 类别 - ANCIENT / FAMOUS
const radioDistribution = ref('') // 分布 - GROW_SCATTERED / GROUP_SHAPE
const radioCompactness = ref('') // 紧密度 - 5 / 4 / 3 / 2 / 1
const radioOwner = ref('') // 权属 - STATE_OWNED / COLLECTIVE / PERSONAL / OTHERS

/**
 * 表单
 */
const form = reactive({
  archive_id: '', // 档案号
  tree_owner: radioOwner.value, // 权属
  company_province: '', // 单位 - 省（市、区）
  company_city: '', // 单位 - 市（地、州）
  company_district: '', // 单位 - 区（市、区）
  longitude_degree_start: '', // 东经 - 度 - 开始
  longitude_branch_start: '', // 东经 - 分 - 开始
  longitude_second_start: '', // 东经 - 秒 - 开始
  longitude_degree_end: '', // 东经 - 度 - 结束
  longitude_branch_end: '', // 东经 - 分 - 结束
  longitude_second_end: '', // 东经 - 秒 - 结束
  latitude_degree_start: '', // 北纬 - 度 - 开始
  latitude_branch_start: '', // 北纬 - 分 - 开始
  latitude_second_start: '', // 北纬 - 秒 - 开始
  latitude_degree_end: '', // 北纬 - 度 - 结束
  latitude_branch_end: '', // 北纬 - 分 - 结束
  latitude_second_end: '', // 北纬 - 秒 - 结束
  tree_area: radioArea.value, // 区域
  tree_location: radioLocation.value, // 坐落
  tree_type: radioType.value, // 类别
  tree_distribution: radioDistribution.value, // 分布
  tree_measureArea: '', // 面积
  tree_count: '', // 古树株数
  tree_speciesMain: '', // 主要树种
  tree_speciesProtect: '', // baohu树种
  tree_ageAverage: '', // 平均树龄
  tree_heightAverage: '', // 平均高度
  ground_circumference: '', // 林分平均胸围（地围）
  site_altitude: '', // 海拔
  site_slopeDirection: '', // 坡向
  site_slopeDegree: '', // 坡度
  site_soilName: '', // 立地条件 - 土壤名称
  site_compactness: radioCompactness.value, // 立地条件 - 紧密度
  activities_conditions: '', // 经营活动情况
  keeper: '', // 管护单位或个人
  status: '' // 管护现状及建议
})
const handleSubmit = () => {
  console.log(form)
}
</script>

<style lang="scss" scoped>
.form-container {
  // max-width: 1000px;
  // min-width: 800px;
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
