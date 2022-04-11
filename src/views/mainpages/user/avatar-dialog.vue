<template>
  <el-dialog v-if="visable" v-model="visable" title="选择头像" width="600px" :before-close="handleClose">
    <el-row>
      <el-col v-for="item in default_avatar" :key="item" :span="4">
        <el-avatar
          :size="60"
          :src="item.src"
          :class="item.src === checkedUrl && 'checked-avatar'"
          @click="handleClick(item)"
        />
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleCommit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue'
const props = defineProps({
  visable: {
    require: true,
    default: false,
    type: Boolean
  },
  checkedAvatar: {
    default: '',
    type: String
  }
})
const { visable } = toRefs(props)
const checkedUrl = ref('')
watch(
  visable,
  (val) => {
    if (val) {
      checkedUrl.value = props.checkedAvatar
    }
  },
  { immediate: true }
)

// 点击选择头像
const handleClick = (val) => {
  checkedUrl.value = val.src
}

const emit = defineEmits(['commitAvatar', 'update:visable'])
// 确认
const handleCommit = () => {
  emit('commitAvatar', checkedUrl.value)
  handleClose()
}

// 关闭
const handleClose = () => {
  checkedUrl.value = ''
  emit('update:visable', false)
}

// 默认头像
const default_avatar = [
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139262-avatar01.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139262-avatar02.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139263-avatar03.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139263-avatar04.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139263-avatar05.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139263-avatar06.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139264-avatar07.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139259-avatar08.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139259-avatar09.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139260-avatar10.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139260-avatar11.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139260-avatar12.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139260-avatar13.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139261-avatar14.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139261-avatar15.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139261-avatar16.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139261-avatar17.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139261-avatar18.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139262-avatar19.png' },
  { src: 'http://ywcd.cc/wp-content/uploads/2022/04/1649139262-avatar20.png' }
]
</script>

<style scoped lang="scss">
.el-avatar {
  padding: 5px;
  cursor: pointer;
  --el-avatar-bg-color: #fff;
  &:hover {
    --el-avatar-bg-color: #c0c4cc;
  }
}
.checked-avatar {
  --el-avatar-bg-color: #c0c4cc;
}

.el-col {
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
