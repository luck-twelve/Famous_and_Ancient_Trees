<template>
  <el-descriptions :column="2" border>
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
    <el-descriptions-item label="树种" :span="2">
      <el-form ref="tree_species" :model="form">
        <el-form-item prop="tree_species" :rules="formRulesMixin.isNotNullSelect">
          <el-select v-model="form.tree_species" placeholder="请选择" class="widthPx-200">
            <el-option label="松柏类" value="songbai"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-descriptions-item>
    <el-descriptions-item label="古树命名" :span="2">
      <div class="rowSC">
        中文名：
        <el-form ref="tree_nameZh" :model="form">
          <el-form-item prop="tree_nameZh" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.tree_nameZh" class="widthPx-120"></el-input>
          </el-form-item>
        </el-form>
        <el-divider direction="vertical"></el-divider>
        英文名：
        <el-form ref="tree_nameEn" :model="form">
          <el-form-item prop="tree_nameEn" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.tree_nameEn" class="widthPx-120"></el-input>
          </el-form-item>
        </el-form>
        <el-divider direction="vertical"></el-divider>
        别名：
        <el-form ref="tree_nameAlias" :model="form">
          <el-form-item prop="tree_nameAlias" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.tree_nameAlias" class="widthPx-120"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="位置" :span="2">
      <div class="rowSC">
        <el-form ref="location_township" :model="form">
          <el-form-item prop="location_township" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.location_township" class="widthPx-120"></el-input>
          </el-form-item>
        </el-form>
        乡镇（街道）
        <el-form ref="location_village" :model="form">
          <el-form-item prop="location_village" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.location_village" class="widthPx-120"></el-input>
          </el-form-item>
        </el-form>
        村（居委会）
        <el-form ref="location_social" :model="form">
          <el-form-item prop="location_social" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.location_social" class="widthPx-120"></el-input>
          </el-form-item>
        </el-form>
        社（组、号）
      </div>
      <div class="rowSC">
        小地名：
        <el-form ref="location_aliasName" :model="form">
          <el-form-item prop="location_aliasName" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.location_aliasName" class="widthPx-150"></el-input>
          </el-form-item>
        </el-form>
        <el-divider direction="vertical"></el-divider>
        经度：
        <el-form ref="longitude" :model="form">
          <el-form-item prop="longitude" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.longitude" class="widthPx-150"></el-input>
          </el-form-item>
        </el-form>
        <el-divider direction="vertical"></el-divider>
        纬度：
        <el-form ref="latitude" :model="form">
          <el-form-item prop="latitude" :rules="formRulesMixin.isNotNullLine">
            <el-input v-model="form.latitude" class="widthPx-150"></el-input>
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
    <el-descriptions-item label="坐落" :span="2">
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
    <el-descriptions-item label="管辖单位/个人" :span="2">
      <el-form ref="keeper" :model="form">
        <el-form-item prop="keeper" :rules="formRulesMixin.isNotNullLine">
          <el-input v-model="form.keeper"></el-input>
        </el-form-item>
      </el-form>
    </el-descriptions-item>
  </el-descriptions>
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
    longitude: '', // 经度
    longitude_degree: '', // 经度 - 度
    longitude_branch: '', // 经度 - 分
    longitude_second: '', // 经度 - 秒
    latitude: '', // 纬度
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
</script>

<style scoped>
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
