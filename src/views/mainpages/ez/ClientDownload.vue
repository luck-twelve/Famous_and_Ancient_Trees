<template>
  <div>
    <el-space>
      <el-button type="primary" :icon="Download">点击下载最新版EZ</el-button>
      <span>漏洞扫描器EZ正式发布，可在左侧证书管理处申请EZ证书，将证书ez.lic放到ez同目录，即可运行。</span>
    </el-space>
    <el-link type="primary">使用手册</el-link>
  </div>
  <el-divider></el-divider>
  <div class="pb-1">
    <span class="mb-1">
      <b>使用协议及免责声明:</b>
    </span>
    <el-alert type="error" :closable="false">
      <template #title>
        <pre><b>1、本软件仅用于经授权的渗透测试使用，请在使用本工具进行渗透测试前，必须获得直接测试目标单位的书面授权。非经被测试目标单位授权，禁止使用本工具实施任何未经许可的测试行为。</b>
<b>2、用户通过使用本软件所获取的任何资产或漏洞等信息，必须严格按照测试目标单位的要求予以处理，未经许可不得对信息另行加工、对外传输提供及非法公开。</b>
3、本软件通过提交申请信息，提供证书授权给用户使用，证书授权使用时间最长为1个月，禁止任何形式的复制、分发和传播该证书。用户应对授权期间的使用行为负责，如未取得被测试目标单位的授权或随意复制、分发及传播该证书致使本软件被他人恶意使用而导致的违法责任，用户应依法承担相应责任。
4、禁止对本软件实施逆向工程、反编译、篡改软件认证流程和试图破译源代码等行为，通过前述行为恶意绕开软件使用的管控限制。
5、如发现用户您有上述禁止行为，或者在使用本软件过程中存在任何非法行为，我们将保留追究用户您法律责任的权利，并将配合执法单位提供证据材料，追究违法责任。
6、我们已对软件使用合规要件做了充分提示，具体详见前第1-4项内容，如用户违法前述要求导致的任何责任，与我们无关，将由用户自行承担全部责任。
<b>为保证软件使用行为即渗透测试行为的可追溯，本软件在使用期间将有限收集个人PC信息，包括MAC地址、本机IP地址以及启动时间等，必要时将提供政府监管部门，请用户知悉。</b></pre>
      </template>
    </el-alert>
  </div>
  <el-divider></el-divider>
  <log-view></log-view>
</template>

<script setup>
import { Download } from '@element-plus/icons-vue'
import LogView from './components/LogView.vue'
</script>

<style scoped>
.el-divider--horizontal {
  margin: 10px 0;
}
pre {
  margin: 0;
  white-space: pre-wrap;
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
  line-height: 1.5em;
}
</style>
