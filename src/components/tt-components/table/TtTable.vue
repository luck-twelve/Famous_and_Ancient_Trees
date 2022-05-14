<template>
  <el-card shadow="never" :class="['card-wrap', { multiple: multiple }]">
    <template v-if="!noHeader" #header>
      <div class="card-header">
        <div>
          <slot name="header" />
        </div>
        <div>
          <el-button v-if="refresh" :icon="Refresh" @click="refreshTable">刷新</el-button>
          <el-dropdown trigger="click" placement="bottom-end" :hide-on-click="false" class="ml-1">
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
          <el-dropdown v-if="false" trigger="click" placement="bottom-end" :hide-on-click="false" class="ml-1">
            <el-button :icon="Sort"></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>导出到 Csv 文件</el-dropdown-item>
                <el-divider style="margin: 6px 0"></el-divider>
                <el-dropdown-item>导出到 Excel 文件</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </template>

    <!-- v-loading="loading" -->
    <el-table
      ref="ttTable"
      :data="list.data"
      stripe
      :highlight-current-row="multiple"
      @select="handleSelect"
      @current-change="handleSelectCurrent"
      @row-click="(row) => rowClick(row)"
    >
      <el-table-column v-if="multiple" type="selection" width="35" />
      <template v-for="item in formThead" :key="item.prop">
        <el-table-column
          :label="item.label"
          :property="item.prop"
          :sortable="item.sortable"
          :width="item.width"
          :min-width="item.minWidth"
          :align="item.align || 'left'"
        ></el-table-column>
      </template>
      <slot v-if="formThead.length > 0" />
    </el-table>
    <el-pagination
      background
      style="margin-top: 20px"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="paginData.pageNum"
      :page-size="paginData.pageSize"
      :page-sizes="[5, 10, 20, 50, 200]"
      :total="list.count || list.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </el-card>
</template>

<script setup>
import { Refresh, Filter, Sort } from '@element-plus/icons-vue'
import { reactive, toRefs, ref, getCurrentInstance, onMounted } from 'vue'
let { proxy } = getCurrentInstance()
const emit = defineEmits(['pagination', 'selectionChange', 'rowClick'])

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
    type: Object,
    default: () => {
      return {
        data: {
          default: () => [],
          type: Array
        }
      }
    }
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
  },
  pagination: {
    type: Function,
    default: function () {}
  },
  searchData: {
    type: Object,
    default: () => {}
  },
  defaultPageSize: {
    type: Number,
    default: 10
  }
})

const rowClick = (row) => {
  emit('rowClick', row)
}

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
 * 单选
 */
const selectioned = ref({})
const handleSelect = (selection, row) => {
  if (!props.multiple) return
  proxy.$refs['ttTable'].clearSelection()
  if (selection.length === 0) {
    // 判断selection是否有值存在
    return
  }
  if (row) {
    selectioned.value = row
    emit('selectionChange', row)
    proxy.$refs['ttTable'].toggleRowSelection(row, true)
  }
}
const handleSelectCurrent = (val) => {
  if (!props.multiple) return
  proxy.$refs['ttTable'].clearSelection()
  if (val) {
    selectioned.value = val
    emit('selectionChange', val)
    proxy.$refs['ttTable'].toggleRowSelection(val, true)
  }
}

/**
 * 分页
 */
const { defaultPageSize } = toRefs(props)
const paginData = reactive({
  pageNum: 1,
  pageSize: defaultPageSize.value
})
const handleSizeChange = (val) => {
  paginData.pageSize = val
  getList()
}
const handleCurrentChange = (val) => {
  paginData.pageNum = val
  getList()
}
const getList = () => {
  emit('pagination', Object.assign(props.searchData, paginData))
}
const { formThead, checkboxVal } = toRefs(state)
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
:deep(.has-gutter) {
  .el-checkbox {
    display: none;
  }
}
.multiple:deep(.el-table__body) tr:hover > td {
  cursor: pointer;
}
</style>
