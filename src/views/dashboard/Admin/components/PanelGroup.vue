<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleTo('abnormal')">
        <div class="card-panel-icon-wrapper icon-abnormal">
          <svg-icon icon-class="abnormal" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">异常情况</div>
          <span class="card-panel-num">{{ state.datasource.abnormalCount }}</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleTo('archive')">
        <div class="card-panel-icon-wrapper icon-archive">
          <svg-icon icon-class="archives" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">档案总数</div>
          <span class="card-panel-num">{{ state.datasource.archiveCount }}</span>
        </div>
      </div>
    </el-col>
    <el-col v-if="roles.includes('admin')" :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleTo('user')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户总数</div>
          <span class="card-panel-num">{{ state.datasource.userCount }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, onBeforeMount, getCurrentInstance } from 'vue'
import { getUserListReq } from '@/api/user'
import { getArchivesCountReq } from '@/api/archives'
import { getAbnormalCountReq } from '@/api/abnormal'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const roles = computed(() => {
  return store.state.user.roles
})
let { proxy } = getCurrentInstance()

const state = reactive({
  datasource: {}
})

// 跳转
const handleTo = (type) => {
  let pathList = {
    user: 'user-list',
    archive: 'archives/archives-list',
    abnormal: 'abnormal'
  }
  proxy.$nextTick(() => {
    proxy.$router.replace({
      path: `/redirect/${pathList[type]}`
    })
  })
}

const getCounts = () => {
  getUserListReq().then(({ data }) => {
    state.datasource.userCount = data.total
  })
  getArchivesCountReq().then(({ data }) => {
    state.datasource.archiveCount = data.data
  })
  getAbnormalCountReq().then(({ data }) => {
    state.datasource.abnormalCount = data.data
  })
}

// 初始化
onBeforeMount(() => {
  getCounts()
})
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #36a3f7;
      }

      .icon-archive {
        background: #34bfa3;
      }

      .icon-abnormal {
        background: #f4516c;
      }
    }

    .icon-people {
      color: #36a3f7;
    }

    .icon-archive {
      color: #34bfa3;
    }

    .icon-abnormal {
      color: #f4516c;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
