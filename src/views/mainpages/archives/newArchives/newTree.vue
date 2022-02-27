<template>
  <div class="form-container">
    <el-descriptions title="名木古树调查表" :column="2" border>
      <el-descriptions-item label="档案号">
        {{ form.archive_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <span>
            挂牌号
            <i style="font-size: 16px; color: #fc5531; vertical-align: -2px; user-select: none">*</i>
          </span>
        </template>
        <div class="rowSC">
          第
          <el-form ref="listing" :model="form">
            <el-form-item prop="listing" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.listing" class="widthPx-300"></el-input>
            </el-form-item>
          </el-form>
          号
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="单位" :span="2">
        <div class="rowSC">
          <el-form ref="company_province" :model="form">
            <el-form-item prop="company_province" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.company_province" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          省（市、区）
          <el-form ref="company_city" :model="form">
            <el-form-item prop="company_city" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.company_city" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          市（地、州）
          <el-form ref="company_district" :model="form">
            <el-form-item prop="company_district" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.company_district" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          区（市、区）
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="位置" :span="2">
        <div class="rowSC">
          <el-form ref="location_township" :model="form">
            <el-form-item prop="location_township" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.location_township" class="widthPx-150"></el-input>
            </el-form-item>
          </el-form>
          乡镇（街道）
          <el-form ref="location_village" :model="form">
            <el-form-item prop="location_village" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.location_village" class="widthPx-150"></el-input>
            </el-form-item>
          </el-form>
          村（居委会）
          <el-form ref="location_social" :model="form">
            <el-form-item prop="location_social" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.location_social" class="widthPx-150"></el-input>
            </el-form-item>
          </el-form>
          社（组、号）
        </div>
        <div class="rowSC">
          经度：
          <el-form ref="longitude_degree" :model="form">
            <el-form-item prop="longitude_degree" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.longitude_degree" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          度
          <el-form ref="longitude_branch" :model="form">
            <el-form-item prop="longitude_branch" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.longitude_branch" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          分
          <el-form ref="longitude_second" :model="form">
            <el-form-item prop="longitude_second" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.longitude_second" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          秒
          <el-divider direction="vertical"></el-divider>
          纬度：
          <el-form ref="latitude_degree" :model="form">
            <el-form-item prop="latitude_degree" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.latitude_degree" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          度
          <el-form ref="latitude_branch" :model="form">
            <el-form-item prop="latitude_branch" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.latitude_branch" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          分
          <el-form ref="latitude_second" :model="form">
            <el-form-item prop="latitude_second" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.latitude_second" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          秒
          <el-divider direction="vertical"></el-divider>
          小地名：
          <el-form ref="location_aliasName" :model="form">
            <el-form-item prop="location_aliasName" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.location_aliasName" class="widthPx-150"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="区域">
        <el-form ref="tree_area" :model="form">
          <el-form-item prop="tree_area" :rules="formRulesMixin.isNotNullCheckbox">
            <el-radio-group v-model="form.tree_area">
              <el-radio label="CITY">城市</el-radio>
              <el-radio label="COUNTRY_SIDE">农村</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-descriptions-item>
      <el-descriptions-item label="坐落">
        <el-form ref="tree_location" :model="form">
          <el-form-item prop="tree_location" :rules="formRulesMixin.isNotNullCheckbox">
            <el-radio-group v-model="form.tree_location">
              <el-radio label="UNIT_COURTYYARD">单位庭院</el-radio>
              <el-radio label="PERSONAL_HOUSE">个人宅院</el-radio>
              <el-radio label="TEMPLE">寺院</el-radio>
              <el-radio label="OTHERS">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-descriptions-item>
      <el-descriptions-item label="类别">
        <el-form ref="tree_type" :model="form">
          <el-form-item prop="tree_type" :rules="formRulesMixin.isNotNullCheckbox">
            <el-radio-group v-model="form.tree_type">
              <el-radio label="ANCIENT">古树</el-radio>
              <el-radio label="FAMOUS">名木</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-descriptions-item>
      <el-descriptions-item label="分布">
        <el-form ref="tree_distribution" :model="form">
          <el-form-item prop="tree_distribution" :rules="formRulesMixin.isNotNullCheckbox">
            <el-radio-group v-model="form.tree_distribution">
              <el-radio label="GROW_SCATTERED">散生</el-radio>
              <el-radio label="GROUP_SHAPE">群状</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-descriptions-item>
      <el-descriptions-item label="树种">
        <el-form ref="tree_species" :model="form">
          <el-form-item prop="tree_species" :rules="formRulesMixin.isNotNullSelect">
            <el-select v-model="form.tree_species" placeholder="请选择">
              <el-option label="松柏类" value="songbai"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-descriptions-item>
      <el-descriptions-item label="树名">
        <div class="rowSC">
          <span class="widthPx-80">中文名：</span>
          <el-form ref="tree_nameZh" :model="form">
            <el-form-item prop="tree_nameZh" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.tree_nameZh"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="rowSC">
          <span class="widthPx-80">英文名：</span>
          <el-form ref="tree_nameEn" :model="form">
            <el-form-item prop="tree_nameEn" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.tree_nameEn"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="rowSC">
          <span class="widthPx-60">别名：</span>
          <el-form ref="tree_nameAlias" :model="form">
            <el-form-item prop="tree_nameAlias" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.tree_nameAlias"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="树龄" :span="2">
        <div class="rowSC">
          真实树龄：
          <el-form ref="tree_ageReal" :model="form">
            <el-form-item prop="tree_ageReal" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.tree_ageReal" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          年
          <el-divider direction="vertical"></el-divider>
          传说树龄：
          <el-form ref="tree_ageLegend" :model="form">
            <el-form-item prop="tree_ageLegend" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.tree_ageLegend" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          年
          <el-divider direction="vertical"></el-divider>
          估测树龄：
          <el-form ref="tree_ageEstimate" :model="form">
            <el-form-item prop="tree_ageEstimate" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.tree_ageEstimate" class="widthPx-100"></el-input>
            </el-form-item>
          </el-form>
          年
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="树高">
        <div class="rowSC">
          <el-form ref="tree_height" :model="form">
            <el-form-item prop="tree_height" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.tree_height" class="widthPx-200"></el-input>
            </el-form-item>
          </el-form>
          米
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="林分平均胸围（地围）">
        <template #label>
          <div>
            林分平均胸围
            <i style="font-size: 16px; color: #fc5531; vertical-align: -2px; user-select: none">*</i>
          </div>
          （地围）
        </template>
        <div class="rowSC">
          <el-form ref="ground_circumference" :model="form">
            <el-form-item prop="ground_circumference" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.ground_circumference" class="widthPx-200"></el-input>
            </el-form-item>
          </el-form>
          厘米
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="冠幅" :span="2">
        <div class="rowSC">
          平均：
          <el-form ref="crown_widthAverage" :model="form">
            <el-form-item prop="crown_widthAverage" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.crown_widthAverage" class="widthPx-120"></el-input>
            </el-form-item>
          </el-form>
          米
          <el-divider direction="vertical"></el-divider>
          东西：
          <el-form ref="crown_widthEW" :model="form">
            <el-form-item prop="crown_widthEW" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.crown_widthEW" class="widthPx-120"></el-input>
            </el-form-item>
          </el-form>
          米
          <el-divider direction="vertical"></el-divider>
          南北：
          <el-form ref="crown_widthNS" :model="form">
            <el-form-item prop="crown_widthNS" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.crown_widthNS" class="widthPx-120"></el-input>
            </el-form-item>
          </el-form>
          米
        </div>
        <div class="rowSC">
          海拔：
          <el-form ref="crown_altitude" :model="form">
            <el-form-item prop="crown_altitude" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.crown_altitude" class="widthPx-120"></el-input>
            </el-form-item>
          </el-form>
          米
          <el-divider direction="vertical"></el-divider>
          坡向：
          <el-form ref="crown_slopeDirection" :model="form">
            <el-form-item prop="crown_slopeDirection" :rules="formRulesMixin.isNotNullSelect">
              <el-select v-model="form.crown_slopeDirection" class="widthPx-130" placeholder="请选择">
                <el-option label="东" value="EAST"></el-option>
                <el-option label="西" value="WEST"></el-option>
                <el-option label="南" value="SOUTH"></el-option>
                <el-option label="北" value="NORTH"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-divider direction="vertical"></el-divider>
          坡度：
          <el-form ref="crown_slopeDegree" :model="form">
            <el-form-item prop="crown_slopeDegree" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.crown_slopeDegree" class="widthPx-120"></el-input>
            </el-form-item>
          </el-form>
          度
          <el-divider direction="vertical"></el-divider>
          坡位：
          <el-form ref="crown_slopePosition" :model="form">
            <el-form-item prop="crown_slopePosition" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.crown_slopePosition" class="widthPx-120"></el-input>
            </el-form-item>
          </el-form>
          部
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="立地条件" :span="2">
        <div class="rowSC">
          土壤名称：
          <el-form ref="site_soilName" :model="form">
            <el-form-item prop="site_soilName" :rules="formRulesMixin.isNotNullLine">
              <el-input v-model="form.site_soilName" class="widthPx-200"></el-input>
            </el-form-item>
          </el-form>
          <el-divider direction="vertical"></el-divider>
          紧密度：
          <el-form ref="site_compactness" :model="form">
            <el-form-item prop="site_compactness" :rules="formRulesMixin.isNotNullCheckbox">
              <el-radio-group v-model="form.site_compactness">
                <el-radio label="TIGHT_QUITE">极紧密</el-radio>
                <el-radio label="TIGHT">紧密</el-radio>
                <el-radio label="MODERATE">中等</el-radio>
                <el-radio label="LOOSE">较疏松</el-radio>
                <el-radio label="LOOSE_QUITE">疏松</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="特殊状况描述" :span="2">
        <el-form ref="special_conditions" :model="form">
          <el-form-item prop="special_conditions" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.special_conditions" :rows="3" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-descriptions-item>
      <el-descriptions-item label="权属" :span="2">
        <el-form ref="tree_owner" :model="form">
          <el-form-item prop="tree_owner" :rules="formRulesMixin.isNotNullCheckbox">
            <el-radio-group v-model="form.tree_owner">
              <el-radio label="STATE_OWNED">国有</el-radio>
              <el-radio label="COLLECTIVE">集体</el-radio>
              <el-radio label="PERSONAL">个人</el-radio>
              <el-radio label="OTHERS">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-descriptions-item>
      <el-descriptions-item label="管辖单位或个人" :span="2">
        <el-form ref="keeper" :model="form">
          <el-form-item prop="keeper" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.keeper"></el-input>
          </el-form-item>
        </el-form>
      </el-descriptions-item>
      <el-descriptions-item label="保护现状及建议" :span="2">
        <el-form ref="status" :model="form">
          <el-form-item prop="status" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.status" :rows="3" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-descriptions-item>
    </el-descriptions>
    <div class="footer-btn">
      <el-button type="primary" style="width: 160px" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { addArchivesTreeReq, updateArchivesTreeReq } from '@/api/archives'
let { proxy } = getCurrentInstance()

const props = defineProps({
  viewType: {
    require: true,
    default: 'add', // add-edit
    type: String
  },
  dataSource: {
    default: () => {
      return {
        tree_area: '',
        tree_location: '',
        tree_type: '',
        tree_distribution: '',
        site_compactness: '',
        tree_owner: ''
      }
    },
    type: Object
  }
})

/**
 * 表单
 */
const form = reactive(props.dataSource || initForm())
const initForm = () => {
  return {
    archive_id: '', // 档案号
    listing: '', // 挂牌号
    company_province: '', // 单位 - 省（市、区）
    company_city: '', // 单位 - 市（地、州）
    company_district: '', // 单位 - 区（市、区）
    location_township: '', // 位置 - 乡镇（街道）
    location_village: '', // 位置 - 村（居委会）
    location_social: '', // 位置 - 社（组、号）
    longitude_degree: '', // 经度 - 度
    longitude_branch: '', // 经度 - 分
    longitude_second: '', // 经度 - 秒
    latitude_degree: '', // 纬度 - 度
    latitude_branch: '', // 纬度 - 分
    latitude_second: '', // 纬度 - 秒
    location_aliasName: '', // 小地名
    tree_area: ref(props.dataSource.tree_area), // 区域 - CITY / COUNTRY_SIDE
    tree_location: ref(props.dataSource.tree_location), // 坐落 - UNIT_COURTYYARD / PERSONAL_HOUSE / TEMPLE / OTHERS
    tree_type: ref(props.dataSource.tree_type), // 类别 - ANCIENT / FAMOUS
    tree_distribution: ref(props.dataSource.tree_distribution), // 分布 - GROW_SCATTERED / GROUP_SHAPE
    tree_species: '', // 树种
    tree_nameZh: '', // 中文名
    tree_nameEn: '', // 英文名
    tree_nameAlias: '', // 别名
    tree_ageReal: '', // 真实树龄
    tree_ageLegend: '', // 传说树龄
    tree_ageEstimate: '', // 估测树龄
    tree_height: '', // 树高
    ground_circumference: '', // 林分平均胸围（地围）
    crown_widthAverage: '', // 平均冠幅
    crown_widthEW: '', // 东西冠幅
    crown_widthNS: '', // 南北冠幅
    crown_altitude: '', // 海拔
    crown_slopeDirection: '', // 坡向 - east / west / south / north
    crown_slopeDegree: '', // 坡度
    crown_slopePosition: '', // 坡位
    site_soilName: '', // 立地条件 - 土壤名称
    site_compactness: ref(props.dataSource.site_compactness), // 立地条件 - 紧密度 - TIGHT_QUITE / TIGHT / MODERATE / LOOSE / LOOSE_QUITE
    special_conditions: '', // 特殊状况描述
    tree_owner: ref(props.dataSource.tree_owner), // 权属 - STATE_OWNED / COLLECTIVE / PERSONAL / OTHERS
    keeper: '', // 管辖单位或个人
    status: '' // 保护现状及建议
  }
}
const emit = defineEmits(['success'])
const handleSubmit = () => {
  let checkList = []
  Object.keys(form).forEach((item) => {
    if (item !== 'archive_id') {
      checkList.push(checkForm(item))
    }
  })
  Promise.all(checkList)
    .then(() => {
      if (!form.archive_id) {
        addArchivesTreeReq(form).then(({ data }) => {
          if (data.flag) {
            emit('success')
          }
        })
      } else {
        updateArchivesTreeReq(form).then(({ data }) => {
          if (data.flag) {
            emit('success')
          }
        })
      }
    })
    .catch(() => {
      ElMessage({ message: '请填写完整表单', type: 'error' })
    })
}
// 表单验证
const checkForm = (formRef) => {
  return new Promise((resolve, reject) => {
    proxy.$refs[formRef].validate((valid) => {
      if (valid) {
        resolve()
      } else reject()
    })
  })
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
.el-form-item {
  margin-bottom: 0;
}
</style>
