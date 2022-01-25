<template>
  <div>
    <h2>查询条件</h2>
    <el-divider></el-divider>
    <pre>搜索语法由一个或多个查询条件构成,查询条件格式为：<tt-code title='name.name1="value"' />，某些参数为整形：<tt-code title="name.name1=int_value" />，记住字符型请用双引号
<tt-code title="name" />表示查询条件名称。
<tt-code title="value" />表示查询值。
查询baidu.com的子域名，查询条件写法如下：
<tt-code title='url.host.domain="baidu.com"' />
支持多种语法，and，or，!=，is not null等
<tt-code title='(url.host="baidu.com" and url.extension="php") or (response.status=200 and url.extension!="js")' />
<tt-code title='response.raw="百度贴吧"' />
<tt-code title='response.headers="nginx" and url.host.domain="baidu.com"' /></pre>
  </div>
  <el-divider></el-divider>
  <h2 class="mb-1">支持的查询类型</h2>
  <el-table :data="tableData" border>
    <el-table-column label="#" type="index" align="center" :resizable="false" width="60px"></el-table-column>
    <el-table-column label="字段" property="field" :resizable="false" width="200px"></el-table-column>
    <el-table-column label="用途" property="used" :resizable="false" width="300px"></el-table-column>
    <el-table-column label="备注" property="remark" :resizable="false" min-width="200px"></el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
import TtCode from '@/components/tt-components/code'

const tableData = ref([])
tableData.value = [
  {
    field: 'request.raw',
    used: '查询请求包含的关键词',
    remark: '支持中英文 response.raw="Content-Disposition: form-data"'
  },
  {
    field: 'request.content_type',
    used: '查询请求包body部分参数类型',
    remark: `-1:UNKNOWN,0:NONE,1:URL_ENCODE,2:MULTIPART,3:XML,4:JSON,5:AMF
request.content_type=4`
  },
  { field: 'request.headers', used: '查询请求包headers的某个字段', remark: 'request.headers="application/json"' },
  { field: 'request.method', used: '查询请求包的method', remark: 'request.method="PUT"' },
  { field: 'response.raw', used: '查询返回包包含的关键词', remark: '支持中英文 response.raw="百度"' },
  { field: 'response.status', used: '查询返回包状态码', remark: 'response.status=200' },
  { field: 'response.headers', used: '查询返回包headers的某个字段', remark: 'response.headers="nginx"' },
  {
    field: 'response.mime_stated',
    used: '查询返回包的mime',
    remark: '支持json,xml,script,html response.mime_stated="json"'
  },
  {
    field: 'url.host',
    used: '查询host包含指定关键字',
    remark: '如url.host="qq.com",匹配出"www.qq.com"，"qq.com.evil.com"'
  },
  {
    field: 'url.host.domain',
    used: '查询包含指定domain的host',
    remark: '查询host包含顶级私有域名，如url.host.domain="qq.com"，则不会搜索出"qq.com.evil.com"'
  },
  {
    field: 'url.host.isdomain',
    used: '查询host是否为域名',
    remark: '接受字符串的true和false，如url.host.isdomain="true"'
  },
  { field: 'url.port', used: '查询url的端口', remark: 'url.port=80' },
  { field: 'url.extension', used: '查询url的文件扩展名', remark: 'url.extension="do"' },
  { field: 'url.icon_hash', used: '查询ico文件的hash', remark: 'url.icon_hash="622752250"' },
  { field: 'url.protocol', used: '查询url的协议', remark: 'url.port="https"' },
  {
    field: 'url.path',
    used: '查询url的path',
    remark: 'Path如/admin/login.php,不含参数,搜索包含admin的pathurl.path="admin"'
  },
  {
    field: 'url.pathroot',
    used: '查询url的pathrooot',
    remark: 'Url的pathroot如http://www.baidu.com/,表示根目录,如搜索url.pathroot="http://www.baidu.com/"'
  },
  {
    field: 'source',
    used: '查询数据来源',
    remark: '支持proxytools,rad,crawlergo,html参数,html表示来自返回包解析的URLsource="rad"'
  },
  { field: 'response.title', used: '查询返回包标题', remark: 'response.title="百度"' }
]
</script>

<style scoped>
pre {
  color: #606266;
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
  line-height: 25px;
}
</style>
