<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">糟糕!</h1>
        <h2 class="my-3">你没有权限访问该页面</h2>
        <ul class="list-unstyled">
          <li class="link-type">
            <a @click="back">返回上一页</a>
          </li>
          <li class="link-type">
            <router-link to="/dashboard">返回首页</router-link>
          </li>
          <li><a href="#" @click.prevent="dialogVisible = true">点我看图</a></li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream." />
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="pan-img" />
    </el-dialog>
  </div>
</template>

<script setup>
import errGif from '@/assets/401_images/401.gif'
import { getCurrentInstance, toRefs, reactive } from 'vue'

let { proxy } = getCurrentInstance()

const state = reactive({
  errGif: errGif + '?' + +new Date(),
  ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
  dialogVisible: false
})

const back = () => {
  if (proxy.$route.query.noGoBack) {
    proxy.$router.push({ path: '/dashboard' })
  } else {
    proxy.$router.go(-1)
  }
}
//导出属性到页面中使用
let { ewizardClap, dialogVisible } = toRefs(state)
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 100px;
    line-height: 100px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
