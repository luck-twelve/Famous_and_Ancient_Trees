<template>
  <el-descriptions :column="2" border>
    <el-descriptions-item label="档案号">
      {{ data.id }}
    </el-descriptions-item>
    <el-descriptions-item label="挂牌号">
      <div class="rowSC">
        第
        <el-input v-model="data.listing" class="widthPx-300"></el-input>
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
      <el-select v-model="data.tree_species" placeholder="请选择" clearable class="widthPx-200">
        <el-option label="松柏" value="松柏"></el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="权属">
      <template #label>
        <span>
          权属
          <i class="marker">*</i>
        </span>
      </template>
      <el-select v-model="data.tree_owner" placeholder="请选择" clearable class="widthPx-200">
        <el-option label="国有" value="国有"></el-option>
        <el-option label="集体" value="集体"></el-option>
        <el-option label="个人" value="个人"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="古树命名" :span="2">
      <div class="rowSC">
        中文名
        <i class="marker mr">*</i>
        ：
        <el-input v-model="data.tree_nameZh" class="widthPx-120"></el-input>
        <el-divider direction="vertical"></el-divider>
        英文名：
        <el-input v-model="data.tree_nameEn" class="widthPx-120"></el-input>
        <el-divider direction="vertical"></el-divider>
        别名：
        <el-input v-model="data.tree_nameAlias" class="widthPx-120"></el-input>
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="位置" :span="2">
      <div class="rowSC">
        经度
        <i class="marker mr">*</i>
        ：
        <el-input v-model="data.longitude" maxlength="18" class="widthPx-130" @change="longChange"></el-input>
        <el-divider direction="vertical"></el-divider>
        纬度
        <i class="marker mr">*</i>
        ：
        <el-input v-model="data.latitude" maxlength="18" class="widthPx-130" @change="latChange"></el-input>
        <el-divider direction="vertical"></el-divider>
        小地名：
        <el-input v-model="data.location_aliasName" class="widthPx-150"></el-input>
      </div>
      <div class="rowSC mt-1">
        详细地址：
        <el-input v-model="data.location_township" class="widthPx-120"></el-input>
        乡镇（街道）
        <el-input v-model="data.location_village" class="widthPx-120"></el-input>
        村（居委会）
        <el-input v-model="data.location_social" class="widthPx-120"></el-input>
        社（组、号）
      </div>
    </el-descriptions-item>
    <el-descriptions-item label="区域">
      <template #label>
        <span>
          区域
          <i class="marker">*</i>
        </span>
      </template>
      <el-select v-model="data.tree_area" placeholder="请选择" clearable class="widthPx-200">
        <el-option label="城市" value="城市"></el-option>
        <el-option label="农村" value="农村"></el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="坐落">
      <template #label>
        <span>
          坐落
          <i class="marker">*</i>
        </span>
      </template>
      <el-select v-model="data.tree_location" placeholder="请选择" clearable class="widthPx-200">
        <el-option label="单位庭院" value="单位庭院"></el-option>
        <el-option label="个人宅院" value="个人宅院"></el-option>
        <el-option label="寺院" value="寺院"></el-option>
        <el-option label="其他" value="其他"></el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item label="管辖单位/个人" :span="2">
      <template #label>
        <span>
          管辖单位/个人
          <i class="marker">*</i>
        </span>
      </template>
      <el-input v-model="data.keeper"></el-input>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import { reactive, inject, toRefs } from 'vue'
const form = reactive(inject('dialogInfo'))
const { data } = toRefs(form)
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
