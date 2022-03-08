<template>
  <el-descriptions :column="2" border>
    <el-descriptions-item label="档案号">
      {{ form.archive_id }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <span>
          挂牌号
          <i class="marker">*</i>
        </span>
      </template>
      <div class="rowSC">
        第
        <el-input v-model="form.listing" class="widthPx-300"></el-input>
        号
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="树种">
      <template #label>
        <span>
          树种
          <i class="marker">*</i>
        </span>
      </template>
      <el-select v-model="form.tree_species" placeholder="请选择" clearable class="widthPx-200">
        <el-option label="松柏类" value="songbai"></el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="权属">
      <template #label>
        <span>
          权属
          <i class="marker">*</i>
        </span>
      </template>
      <el-select v-model="form.tree_owner" placeholder="请选择" clearable class="widthPx-200">
        <el-option label="国有" value="STATE_OWNED"></el-option>
        <el-option label="集体" value="COLLECTIVE"></el-option>
        <el-option label="个人" value="PERSONAL"></el-option>
        <el-option label="其他" value="OTHERS"></el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="古树命名" :span="2">
      <div class="rowSC">
        中文名
        <i class="marker mr">*</i>
        ：
        <el-input v-model="form.tree_nameZh" class="widthPx-120"></el-input>
        <el-divider direction="vertical"></el-divider>
        英文名：
        <el-input v-model="form.tree_nameEn" class="widthPx-120"></el-input>
        <el-divider direction="vertical"></el-divider>
        别名：
        <el-input v-model="form.tree_nameAlias" class="widthPx-120"></el-input>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="位置" :span="2">
      <div class="rowSC">
        经度：
        <el-input v-model="form.longitude" maxlength="18" class="widthPx-160"></el-input>
        <el-divider direction="vertical"></el-divider>
        纬度：
        <el-input v-model="form.latitude" maxlength="18" class="widthPx-160"></el-input>
        <el-divider direction="vertical"></el-divider>
        小地名：
        <el-input v-model="form.location_aliasName" class="widthPx-150"></el-input>
      </div>
      <div class="rowSC mt-1">
        详细地址：
        <el-input v-model="form.location_township" class="widthPx-120"></el-input>
        乡镇（街道）
        <el-input v-model="form.location_village" class="widthPx-120"></el-input>
        村（居委会）
        <el-input v-model="form.location_social" class="widthPx-120"></el-input>
        社（组、号）
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="区域">
      <el-select v-model="form.tree_area" placeholder="请选择" clearable class="widthPx-200">
        <el-option label="城市" value="CITY"></el-option>
        <el-option label="农村" value="COUNTRY_SIDE"></el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="坐落">
      <el-select v-model="form.tree_location" placeholder="请选择" clearable class="widthPx-200">
        <el-option label="单位庭院" value="UNIT_COURTYYARD"></el-option>
        <el-option label="个人宅院" value="PERSONAL_HOUSE"></el-option>
        <el-option label="寺院" value="TEMPLE"></el-option>
        <el-option label="其他" value="OTHERS"></el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="管辖单位/个人" :span="2">
      <el-input v-model="form.keeper"></el-input>
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
