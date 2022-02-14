<template>
  <el-dialog v-if="visable" v-model="visable" title="新增用户" width="400px" :before-close="handleClose">
    <el-form v-if="visable" ref="dialogForm" :model="form" :rules="formRulesMixin" label-width="80px">
      <el-form-item prop="username" label="用户名" :rules="formRulesMixin.isNotNull">
        <div class="rowSC">
          <el-input v-model="form.username" placeholder="用户名" />
          <!--占位-->
          <div class="show-pwd" />
        </div>
      </el-form-item>
      <el-form-item prop="password" label="密码" :rules="formRulesMixin.isNotNull">
        <div class="rowSC">
          <el-input ref="pwdRef" v-model="form.password" :type="pwdType" placeholder="密码" />
          <!--占位-->
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </div>
      </el-form-item>
      <el-form-item prop="avatar" label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/api/file/setAvatar"
          thumbnail-mode="true"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item prop="roles" label="用户权限" :rules="formRulesMixin.isNotNull">
        <div class="rowSC">
          <el-select v-model="form.roles" placeholder="请选择">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="工作人员" value="worker"></el-option>
            <el-option label="群众" value="people"></el-option>
          </el-select>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleCommit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, toRefs, watch, getCurrentInstance } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { addUserReq } from '@/api/user'
let { proxy } = getCurrentInstance()
const props = defineProps({
  dialogVisible: {
    require: true,
    default: false,
    type: Boolean
  }
})
const { dialogVisible } = toRefs(props)
const state = reactive({
  visable: dialogVisible.value
})
let { visable } = toRefs(state)
watch(
  dialogVisible,
  (val) => {
    state.visable = val
  },
  { immediate: true }
)
const emit = defineEmits(['update:dialogVisible'])
const handleClose = () => {
  form.username = ''
  form.password = ''
  form.avatar = 'http://ywcd.cc/wp-content/uploads/2021/04/cropped-avatar.jpg'
  form.roles = 'people'
  emit('update:dialogVisible', false)
}
const handleCommit = () => {
  proxy.$refs['dialogForm'].validate((valid) => {
    if (valid) {
      addUserReq(form)
      handleClose()
    } else {
      return false
    }
  })
}

/**
 * form表单
 */
const form = reactive({
  username: '',
  password: '',
  avatar: 'http://ywcd.cc/wp-content/uploads/2021/04/cropped-avatar.jpg',
  roles: 'people'
})
let pwdType = ref('password')
const pwdRef = ref(null)
let showPwd = () => {
  pwdType.value = pwdType.value === 'password' ? '' : 'password'
  proxy.$nextTick(() => {
    pwdRef.value.focus()
  })
}

/**
 * 头像上传
 */
const imageUrl = ref('')
const handleAvatarSuccess = (res, file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
}
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('Avatar picture must be JPG format!')
  }
  if (!isLt2M) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
  }
  return isJPG && isLt2M
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.show-pwd {
  width: 50px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  text-align: center;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  /* overflow: hidden; */
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
</style>
