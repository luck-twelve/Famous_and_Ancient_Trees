<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="400px" :before-close="handleClose">
    <div class="container">
      <el-form v-if="dialogVisible" :model="form" :rules="formRulesMixin">
        <el-form-item prop="oldPass" :rules="formRulesMixin.isNotNull">
          <div class="rowSC">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="oldPassType"
              ref="oldPassRef"
              v-model="form.oldPass"
              :type="oldPassType"
              name="oldPass"
              placeholder="原密码"
            />
            <!--占位-->
            <span class="show-pwd" @click="showOldPass">
              <svg-icon :icon-class="oldPassType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </div>
        </el-form-item>
        <el-form-item prop="newPass" :rules="formRulesMixin.isNotNull">
          <div class="rowSC">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="newPassType"
              ref="newPassRef"
              v-model="form.newPass"
              :type="newPassType"
              name="newPass"
              placeholder="新密码"
            />
            <!--占位-->
            <span class="show-pwd" @click="showNewPass">
              <svg-icon :icon-class="newPassType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleComfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, toRefs, ref, getCurrentInstance } from 'vue'
let { proxy } = getCurrentInstance()

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  }
})
const { dialogVisible } = toRefs(props)
const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
}
const handleComfirm = () => {
  emit('close')
}

const form = reactive({
  oldPass: '',
  newPass: ''
})
let oldPassType = ref('password')
let newPassType = ref('password')
const oldPassRef = ref(null)
const newPassRef = ref(null)
let showOldPass = () => {
  oldPassType.value = oldPassType.value === 'password' ? '' : 'password'
  proxy.$nextTick(() => {
    oldPassRef.value.focus()
  })
}
let showNewPass = () => {
  newPassType.value = newPassType.value === 'password' ? '' : 'password'
  proxy.$nextTick(() => {
    newPassRef.value.focus()
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.svg-container {
  padding-left: 6px;
  color: $dark_gray;
  text-align: center;
  width: 30px;
  margin-right: 10px;
}
.show-pwd {
  width: 50px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  text-align: center;
}
.container {
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #fff;
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
