<template>
  <div class="form-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="古树基本资料" name="base">
        <new-tree-base></new-tree-base>
      </el-tab-pane>
      <el-tab-pane label="古树生长资料" name="grow">
        <new-tree-grow></new-tree-grow>
      </el-tab-pane>
      <el-tab-pane label="古树附加资料" name="addition">
        <new-tree-addition></new-tree-addition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { addArchivesTreeReq, updateArchivesTreeReq } from '@/api/archives'
import newTreeBase from './newTreeBase.vue'
import newTreeGrow from './newTreeGrow.vue'
import newTreeAddition from './newTreeAddition.vue'
let { proxy } = getCurrentInstance()

const activeName = ref('base')

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
console.log(inject('dialogInfo'))
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
</style>
