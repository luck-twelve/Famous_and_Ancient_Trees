<!--suppress ALL -->
<template>
  <div class="login-container columnCC">
    <el-form
      v-if="!state.isRegister"
      ref="refLoginForm"
      size="medium"
      class="login-form"
      :model="formInline"
      :rules="formRulesMixin"
    >
      <div class="title-container">
        <h3 class="title text-center">{{ settings.title }}</h3>
      </div>
      <el-form-item prop="username" :rules="formRulesMixin.isNotNull">
        <div class="rowSC">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="formInline.username" placeholder="用户名" @keyup.enter="handleLogin" />
          <!--占位-->
          <div class="show-pwd" />
        </div>
      </el-form-item>
      <!--<el-form-item prop="password" :rules="formRulesMixin.passwordValid">-->
      <el-form-item prop="password" :rules="formRulesMixin.isNotNull">
        <div class="rowSC">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="refPassword"
            v-model="formInline.password"
            :type="passwordType"
            name="password"
            placeholder="密码"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </div>
      </el-form-item>
      <div class="tip-message rowBC">
        <span>{{ tipMessage }}</span>
        <el-link :icon="Promotion" :underline="false" class="tip-register" @click="toChange">去注册</el-link>
      </div>
      <el-button :loading="loading" type="primary" class="login-btn" size="medium" @click.prevent="handleLogin">
        {{ getI18nName('login', 'logIn') }}
      </el-button>
    </el-form>

    <el-form v-else ref="refRegisterForm" size="medium" class="login-form" :model="formInline" :rules="formRulesMixin">
      <div class="title-container">
        <h3 class="title text-center">{{ settings.title }}</h3>
      </div>
      <el-form-item prop="username" :rules="formRulesMixin.isNotNull">
        <div class="rowSC">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="formInline.username" placeholder="用户名" @keyup.enter="handleRegister" />
          <!--占位-->
          <div class="show-pwd" />
        </div>
      </el-form-item>
      <el-form-item prop="password" :rules="formRulesMixin.passwordValid">
        <div class="rowSC">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="refPassword"
            v-model="formInline.password"
            :type="passwordType"
            name="password"
            placeholder="密码"
            @keyup.enter="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </div>
      </el-form-item>
      <el-form-item prop="passwordValid" :rules="formRulesMixin.isSame(formInline.password)">
        <div class="rowSC">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordValidType"
            ref="refPasswordValid"
            v-model="formInline.passwordValid"
            :type="passwordValidType"
            name="passwordValid"
            placeholder="确认密码"
            @keyup.enter="handleRegister"
          />
          <span class="show-pwd" @click="showPwdValid">
            <svg-icon :icon-class="passwordValidType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </div>
      </el-form-item>
      <div class="tip-message rowBC">
        <el-link :icon="ArrowLeftBold" :underline="false" class="tip-register" @click="toChange">返回登录</el-link>
      </div>
      <el-button :loading="loading" type="primary" class="login-btn" size="medium" @click.prevent="handleRegister">
        {{ getI18nName('login', 'register') }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
/*可以设置默认的名字*/
export default {
  name: 'Login'
}
</script>

<script setup>
import { Promotion, ArrowLeftBold } from '@element-plus/icons-vue'
import { reactive, getCurrentInstance, watch, ref } from 'vue'
import settings from '@/settings'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { addUserReq } from '@/api/user'

//i18
import useI18n from '@/hooks/useI18n'
const { getI18nName } = useI18n()

let { proxy } = getCurrentInstance()
//form
let formInline = reactive({
  username: 'Admin',
  password: '123456',
  avatar: 'http://ywcd.cc/wp-content/uploads/2021/04/cropped-avatar.jpg',
  roles: 'people'
})
let state = reactive({
  isRegister: false, //是否为注册
  otherQuery: {},
  redirect: undefined
})

/* listen router change  */
const route = useRoute()
let getOtherQuery = (query) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

const toChange = () => {
  if (state.isRegister) {
    formInline.username = 'Admin'
    formInline.password = '123456'
  } else {
    formInline.username = ''
    formInline.password = ''
  }
  state.isRegister = !state.isRegister
}

/*
 *  login relative
 * */
let loading = ref(false)
let tipMessage = ref('')
const store = useStore()
let handleLogin = () => {
  proxy.$refs['refLoginForm'].validate((valid) => {
    if (valid) {
      fatLoginReq()
    } else {
      return false
    }
  })
}
let fatLoginReq = () => {
  loading.value = true
  store
    .dispatch('user/login', formInline)
    .then(() => {
      proxy.$router.push({ path: state.redirect || '/dashboard', query: state.otherQuery })
      ElMessage({ message: '登录成功', type: 'success' })
    })
    .catch((error) => {
      if (typeof error != 'object') {
        error = JSON.parse(error)
      }
      if (error.code) {
        if (error.code === 403) {
          tipMessage.value = error.msg
        } else {
          ElMessage({ message: error.msg, type: 'error' })
        }
      }
      proxy.sleepMixin(30).then(() => {
        loading.value = false
      })
    })
}

/*
 *  register relative
 * */
let handleRegister = () => {
  proxy.$refs['refRegisterForm'].validate((valid) => {
    if (valid) {
      fatRegisterReq()
    } else {
      return false
    }
  })
}
const fatRegisterReq = () => {
  loading.value = true
  const { username, password, avatar, roles } = formInline
  addUserReq({
    username,
    password,
    avatar,
    roles
  }).then(({ data }) => {
    loading.value = false
    if (data.flag) {
      ElMessageBox.confirm(`用户名:${username}`, '注册成功', {
        confirmButtonText: '立即进入',
        type: 'success',
        showClose: false,
        distinguishCancelAndClose: true,
        closeOnClickModal: false,
        showCancelButton: false,
        center: true
      }).then(() => {
        fatLoginReq()
      })
    }
  })
}

/*
 *  password show or hidden
 * */
let passwordType = ref('password')
const refPassword = ref(null)
let showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  proxy.$nextTick(() => {
    refPassword.value.focus()
  })
}
/*
 *  passwordValid show or hidden
 * */
let passwordValidType = ref('password')
const refPasswordValid = ref(null)
let showPwdValid = () => {
  if (passwordValidType.value === 'password') {
    passwordValidType.value = ''
  } else {
    passwordValidType.value = 'password'
  }
  proxy.$nextTick(() => {
    refPasswordValid.value.focus()
  })
}

watch(
  route,
  (route) => {
    const query = route.query
    if (query) {
      state.redirect = query.redirect
      state.otherQuery = getOtherQuery(query)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  height: 100vh;
  width: 100%;
  background-color: #2d3a4b;
  .login-form {
    margin-bottom: 20vh;
    width: 360px;
  }
  .title-container {
    .title {
      font-size: 22px;
      color: #eee;
      margin: 0px auto 25px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}

.svg-container {
  padding-left: 6px;
  color: $dark_gray;
  text-align: center;
  width: 30px;
}

//错误提示信息
.tip-message {
  color: #e4393c;
  height: 30px;
  margin-top: -20px;
  margin-bottom: 3px;
  font-size: 12px;
}
.tip-register {
  color: #eee;
  font-size: 12px;
}

//登录按钮
.login-btn {
  width: 100%;
  margin-bottom: 30px;
}
.show-pwd {
  width: 50px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  text-align: center;
}
</style>

<style lang="scss">
//css 样式重置 增加个前缀避免全局污染
.login-container {
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-input input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 10px 5px 10px 15px;
    color: #fff;
    height: 42px; //此处调整item的高度
    caret-color: #fff;
  }
}
</style>
