<template>
  <el-dialog
    v-if="visable"
    v-model="visable"
    :title="dialogType === 'add' ? '新增用户' : '编辑信息'"
    width="450px"
    :before-close="handleClose"
  >
    <el-form
      v-if="visable"
      ref="dialogForm"
      :model="form"
      :rules="formRulesMixin"
      label-width="80px"
      style="padding-right: 20px"
    >
      <el-form-item prop="username" label="用户名" :rules="formRulesMixin.isNotNull">
        <el-input v-model="form.username" placeholder="用户名" maxlength="12" show-word-limit clearable />
      </el-form-item>
      <el-form-item prop="password" label="密码" :rules="formRulesMixin.isNotNull">
        <el-input v-model="form.password" type="password" placeholder="密码" maxlength="12" show-password clearable />
      </el-form-item>
      <el-form-item prop="avatar" label="头像">
        <!-- action="http://localhost:3000/api/file/setAvatar" -->
        <el-upload
          class="avatar-uploader"
          :thumbnail-mode="true"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item prop="roles" label="用户权限" :rules="formRulesMixin.isNotNull">
        <el-select v-model="form.roles" placeholder="请选择">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="工作人员" value="worker"></el-option>
          <el-option label="普通用户" value="people"></el-option>
        </el-select>
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
import { addUserReq, updateUserReq } from '@/api/user'
let { proxy } = getCurrentInstance()
const props = defineProps({
  dialogVisible: {
    require: true,
    default: false,
    type: Boolean
  },
  dialogType: {
    require: true,
    default: 'add', // add-edit
    type: String
  },
  dialogData: {
    default: () => {},
    type: Object
  }
})
const { dialogVisible, dialogType, dialogData } = toRefs(props)
const state = reactive({
  visable: dialogVisible.value
})
watch(
  dialogVisible,
  (val) => {
    state.visable = val
    if (val && dialogData.value) {
      const { uid, username, password, avatar, roles } = dialogData.value
      form.uid = uid
      form.username = username
      form.password = password
      form.avatar = avatar
      form.roles = roles
      imageUrl.value = avatar
    }
  },
  { immediate: true }
)
let { visable } = toRefs(state)

const emit = defineEmits(['update:dialogVisible', 'success'])
const handleClose = () => {
  form.uid = ''
  form.username = ''
  form.password = ''
  form.avatar = 'http://ywcd.cc/wp-content/uploads/2021/04/cropped-avatar.jpg'
  form.roles = 'people'
  imageUrl.value = ''
  emit('update:dialogVisible', false)
}
const handleCommit = () => {
  proxy.$refs['dialogForm'].validate((valid) => {
    if (valid) {
      let action = addUserReq
      if (dialogType.value === 'edit') {
        action = updateUserReq
      }
      action(form).then(({ data }) => {
        if (data.code === 200) {
          ElMessage({ message: data.msg, type: 'success' })
          emit('success')
          handleClose()
        } else {
          ElMessage({ message: data.msg, type: 'error' })
        }
      })
    } else {
      return false
    }
  })
}

/**
 * form表单
 */
const form = reactive({
  uid: '',
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
  // imageUrl.value = URL.createObjectURL(file.raw)
  imageUrl.value = 'http://ywcd.cc/wp-content/uploads/2021/04/cropped-avatar.jpg'
}
const beforeAvatarUpload = (file) => {
  imageUrl.value = 'http://ywcd.cc/wp-content/uploads/2021/04/cropped-avatar.jpg'
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