<template>
  <el-card shadow="never" class="card-wrap">
    <template v-if="!noHeader" #header>
      <div class="card-header">
        <div>
          <slot name="header" />
          <el-button v-if="refresh" :icon="Refresh" @click="refreshTable">刷新表格</el-button>
        </div>
        <div>
          <el-dropdown trigger="click" placement="bottom-end" :hide-on-click="false">
            <el-button :icon="Filter"></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in column" :key="item.prop">
                  <el-checkbox
                    :label="item.label"
                    :checked="isChecked(item, checkboxVal)"
                    @change="(val) => change(val, item)"
                  />
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown trigger="click" placement="bottom-end" :hide-on-click="false" class="ml-1">
            <el-button :icon="Sort"></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>导出到 Csv 文件</el-dropdown-item>
                <el-dropdown-item>导出到 Excel 文件</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </template>

    <el-table v-loading="loading" :data="list.data" border stripe>
      <el-table-column v-if="multiple" type="selection" width="35" />
      <template v-for="item in formThead" :key="item.prop">
        <el-table-column
          :label="item.label"
          :property="item.prop"
          :sortable="item.sortable"
          :width="item.width"
          :align="item.align || 'left'"
        ></el-table-column>
      </template>
      <slot />
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 30, 100, 500, 1000]"
      :page-size="10"
      :total="list.count"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </el-card>
</template>

<script setup>
import { Refresh, Filter, Sort } from '@element-plus/icons-vue'
import { ref, reactive, toRefs, getCurrentInstance } from 'vue'
let { proxy } = getCurrentInstance()

const props = defineProps({
  noHeader: {
    default: false,
    type: Boolean
  },
  refresh: {
    default: false,
    type: Boolean
  },
  multiple: {
    default: false,
    type: Boolean
  },
  list: {
    require: true,
    default: () => {
      return {
        data: {
          default: () => {
            return []
          },
          type: Array
        },
        count: {
          default: 0,
          type: Number
        }
      }
    },
    type: Object
  },
  // 表头
  column: {
    default: () => {
      return []
    },
    type: Array
  },
  loading: {
    default: false,
    type: Boolean
  }
})

/**
 * 动态table
 */
const defaultFormThead = [...props.column] //默认表头
const defaultCheckboxVal = defaultFormThead.map((item) => item.prop) //默认选中
const state = reactive({
  formThead: [...defaultFormThead], //表格显示表头
  checkboxVal: [...defaultCheckboxVal] //下拉列表已选
})
const isChecked = (columnItem, checkbox) => {
  return !!checkbox.find((pp) => pp == columnItem.prop)
}
const change = (checked, item) => {
  let checkbox = state.checkboxVal
  if (checked) {
    state.formThead.splice(checkbox.indexOf(item.prop), 0, item)
  } else {
    let thead = state.formThead
    for (let i = 0; i < thead.length; i++) {
      if (thead[i].prop == item.prop) {
        state.formThead.splice(i, 1)
        // if (thead.length === 0) {
        //   state.formThead.splice(0, 0, defaultFormThead[0])
        // }
        break
      }
    }
  }
}
const { formThead, checkboxVal } = toRefs(state)

/**
 * 刷新
 */
const refreshTable = () => {
  const fullPath = proxy.$route.fullPath
  proxy.$nextTick(() => {
    proxy.$router.replace({
      path: `/redirect${fullPath}`
    })
  })
}

/**
 * 分页
 */
const currentPage = ref(1)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped lang="scss">
.el-card {
  border: none;
}
.card-wrap {
  height: 100%;
  :deep(.el-card__header) {
    padding: 10px 20px 10px 10px;
  }
  :deep(.el-card__body) {
    padding: 10px;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
