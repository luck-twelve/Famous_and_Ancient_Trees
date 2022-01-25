<template>
  <div>
    <h2><b>指纹奖励标准</b></h2>
    <el-divider></el-divider>
    <span class="mb-1">EZ 指纹征集类别表：</span>
    <el-table :data="fingerData" :header-cell-style="{ textAlign: 'center' }" border stripe>
      <el-table-column
        width="100px"
        label="指纹类别"
        property="fingerType"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column label="覆盖度要求" property="coverage"></el-table-column>
      <el-table-column width="100px" property="accuracyRate" align="center" :resizable="false">
        <template #header>
          <el-tooltip content="匹配结果中正确结果占比" placement="top">
            <span style="cursor: pointer">
              精确率
              <el-icon><info-filled /></el-icon>
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column width="100px" property="recallRate" align="center" :resizable="false">
        <template #header>
          <el-tooltip content="匹配数/(匹配数+遗漏数)" placement="top">
            <span style="cursor: pointer">
              召回率
              <el-icon><info-filled /></el-icon>
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        label="奖励标准"
        property="rewardStandard"
        align="center"
        :resizable="false"
      ></el-table-column>
    </el-table>
    <ol>
      <li>
        提交的指纹首先需满足是当前EZ尚未集成或已有集成但指纹质量未达到要求，其次需满足以上表格中精确率与召回率两项要求。当贡献者所提交的指纹未达到要求时，审核人员有权拒绝该指纹或经沟通继续完善。若完善后的指纹达到质量要求，贡献者仍可获得对应级别的贡献奖励。
      </li>
      <li>
        严禁刷分。贡献者应当对提交的指纹有一定的理解和加工，严禁将其他工具的指纹规则批量提交到平台来进行刷分。对于批量刷分的行为，审核人员有权进行忽略处置。
      </li>
      <li>质量优先。对于高质量的指纹，审核人员可酌情予以50%以内幅度的加分（积分均为四舍五入后的整数）。</li>
      <li>
        鼓励创新。对于同一组件的指纹，若EZ原有指纹无法覆盖而贡献者提交的新指纹可以覆盖，相关情况经过确认后，审核人员将给予一次性20积分的奖励。
      </li>
    </ol>
  </div>
  <div>
    <h2><b>POC奖励标准</b></h2>
    <span>EZ 原创POC征集类别表：</span>
    <el-table :data="pocData" border>
      <el-table-column label="Level" property="prop"></el-table-column>
      <el-table-column label="风险等级" property="prop"></el-table-column>
      <el-table-column label="精确率（匹配结果中正确结果占比）" property="prop"></el-table-column>
      <el-table-column label="召回率（匹配数/(匹配数+遗漏数)）" property="prop"></el-table-column>
      <el-table-column label="奖励标准" property="prop"></el-table-column>
    </el-table>
    <ol>
      <li>
        提交POC时，需尽可能使用finger字段指定指纹类型，若无法匹配出指纹可写明具体情况，对于填写finger字段的情况，将予以5积分奖励。
      </li>
      <li>
        提交POC时，需提交经确认存在相关漏洞的靶标环境，若环境存在授权争议问题或无法找到相应漏洞验证环境，可提交docker环境并写清docker搭建方法。对于复现存在一定难度的漏洞，还需要提交漏洞漏洞分析文档。满足上述条件的贡献者，将予以5积分奖励。
      </li>
      <li>
        对于提交的POC可能会引起服务器DoS，文件或数据库新增、修改、删除以及防火墙告警、账号被锁定等情况，贡献者需在备注信息中予以说明。
      </li>
      <li>
        对于0day或1day漏洞POC的提交，审核人员将给予100%-300%的奖励加成，若符合0day或1day的条件，请在提交POC的备注信息中予以说明。
      </li>
      <li>
        对于新爆发漏洞（曝光时间小于15个自然日的漏洞）POC的提交，根据提交的先后顺序进行奖励，第一个提交并审核通过的贡献者拥有100%积分奖励，第二个提交并审核通过的贡献者拥有50%的积分奖励，第三个提交并审核通过的贡献者拥有20%的积分奖励，后续的提交者不再享有积分奖励。
      </li>
      <li>
        对于历史漏洞（曝光时间大于等于15个自然日的漏洞）POC的提交，第一个提交并审核通过的贡献者拥有100%的奖励，后续提交者不再享有奖励。
      </li>
      <li>
        对于其他平台移植的POC，贡献者需注明来源。奖励标准统一采用5积分（只有POC）、10积分（POC+复现环境或指纹）、15积分（有POC+复现环境+指纹）
        3个维度进行评定。
      </li>
      <li>
        严禁刷分。贡献者应当对提交的POC有一定的理解和加工，严禁将其他工具的POC规则批量提交到平台来进行刷分。对于批量刷分的行为，审核人员有权进行忽略处置。
      </li>
      <li>质量优先。对于高质量的POC，审核人员可酌情予以50%以内幅度的加分（积分均为四舍五入后的整数）。</li>
      <li>对于0day或1day漏洞POC的提交，按照公司漏洞运营计划发放奖励，我们不公开0day或1day漏洞的相关信息。</li>
    </ol>
  </div>
  <div>
    <h2><b>EZ/Titan Bug反馈奖励标准</b></h2>
    <span>
      对于EZ或Titan相关Bug，可通过企业微信反馈，若经确认，给予反馈者10-30积分奖励。对于现有POC存在误报或漏报情况的反馈，将根据影响程度给予反馈者10-30积分奖励。
    </span>
    <span>
      相关条款于2022年1月1日开始试用，试用时间截至2022年1月31日，试用期间贡献者可对奖励计划提出建设性建议，一经采纳，将给予提议人10积分奖励。
    </span>
  </div>
</template>

<script setup>
import { InfoFilled } from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'

const state = reactive({
  fingerData: [],
  pocData: []
})
state.fingerData = [
  {
    fingerType: 'A类',
    coverage:
      '目前使用量级较大的开源及商业组件，对标NTI或fofa匹配结果>=100w条记录。如 Apache、Nginx、Tomcat、SpringBoot等',
    accuracyRate: '>=80%',
    recallRate: '>=90%',
    rewardStandard: '30积分'
  },
  {
    fingerType: 'B类',
    coverage:
      '目前使用量级中等的开源及商业组件，对标NTI或fofa匹配结果>=20w <=100w条记录。如 Joomla、GitLab、ThinkPHP、phpMyAdmin等',
    accuracyRate: '>=80%',
    recallRate: '>=90%',
    rewardStandard: '10积分'
  },
  {
    fingerType: 'C类',
    coverage: '目前使用量较小的开源及商业组件，但已有相关POC或提交人已在平台提交相关POC',
    accuracyRate: '>=80%',
    recallRate: '>=90%',
    rewardStandard: '5积分'
  }
]
const { fingerData, pocData } = toRefs(state)
</script>

<style scope></style>
