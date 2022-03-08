<template>
  <el-descriptions :column="2" border>
    <el-descriptions-item label="树龄" :span="2">
      <div class="rowSC">
        估测树龄：
        <el-input v-model="form.tree_ageEstimate" class="widthPx-100"></el-input>
        年
        <el-divider direction="vertical"></el-divider>
        真实树龄：
        <el-input v-model="form.tree_ageReal" class="widthPx-100"></el-input>
        年
        <el-divider direction="vertical"></el-divider>
        传说树龄：
        <el-input v-model="form.tree_ageLegend" class="widthPx-100"></el-input>
        年
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="树高">
      <div class="rowSC">
        <el-input v-model="form.tree_height" class="widthPx-200"></el-input>
        米
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="分布">
      <el-select v-model="form.tree_distribution" placeholder="请选择" class="widthPx-200">
        <el-option label="散生" value="GROW_SCATTERED"></el-option>
        <el-option label="群状" value="GROUP_SHAPE"></el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="林分平均胸围（地围）">
      <template #label>
        <div>林分平均胸围</div>
        （地围）
      </template>
      <div class="rowSC">
        <el-input v-model="form.ground_circumference" class="widthPx-200"></el-input>
        厘米
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="海拔">
      <div class="rowSC">
        <el-input v-model="form.crown_altitude" class="widthPx-150"></el-input>
        米
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="冠幅" :span="2">
      <div class="rowSC">
        东西：
        <el-input v-model="form.crown_widthEW" class="widthPx-130"></el-input>
        米
        <el-divider direction="vertical"></el-divider>
        南北：
        <el-input v-model="form.crown_widthNS" class="widthPx-130"></el-input>
        米
        <el-divider direction="vertical"></el-divider>
        平均：
        <el-input v-model="form.crown_widthAverage" class="widthPx-130"></el-input>
        米
      </div>
      <div class="rowSC mt-1">
        坡向：
        <el-select v-model="form.crown_slopeDirection" class="widthPx-150" placeholder="请选择">
          <el-option label="东" value="EAST"></el-option>
          <el-option label="西" value="WEST"></el-option>
          <el-option label="南" value="SOUTH"></el-option>
          <el-option label="北" value="NORTH"></el-option>
        </el-select>
        <el-divider direction="vertical"></el-divider>
        坡度：
        <el-input v-model="form.crown_slopeDegree" class="widthPx-120"></el-input>
        度
        <el-divider direction="vertical"></el-divider>
        坡位：
        <el-input v-model="form.crown_slopePosition" class="widthPx-120"></el-input>
        部
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="立地条件" :span="2">
      <div class="rowSC">
        土壤名称：
        <el-input v-model="form.site_soilName" class="widthPx-200"></el-input>
        <el-divider direction="vertical"></el-divider>
        紧密度：
        <el-select v-model="form.site_compactness" class="widthPx-200" placeholder="请选择">
          <el-option label="极紧密" value="TIGHT_QUITE"></el-option>
          <el-option label="紧密" value="TIGHT"></el-option>
          <el-option label="中等" value="MODERATE"></el-option>
          <el-option label="较疏松" value="LOOSE"></el-option>
          <el-option label="疏松" value="LOOSE_QUITE"></el-option>
        </el-select>
      </div>
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
