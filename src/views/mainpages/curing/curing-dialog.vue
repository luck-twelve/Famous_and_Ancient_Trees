<template>
  <el-dialog v-model="visible" :title="title" width="50%" :before-close="handleClose">
    <span>{{ content }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, toRefs, watch } from 'vue'
const props = defineProps({
  visible: {
    require: true,
    default: false,
    type: Boolean
  },
  type: {
    default: '',
    type: String
  }
})

const state = reactive({
  title: '',
  content: ''
})
const { visible } = toRefs(props)
const { title, content } = toRefs(state)

watch(visible, (val) => {
  if (val) {
    setInfo(props.type)
  }
})
const setInfo = (type) => {
  switch (type) {
    case 'spring':
      state.title = '春季养护技术措施及要求'
      state.content = [
        '整理清除古树名木枯死枝叶、病虫枝及树下病虫越冬场所等，消灭越冬病虫源。如需枝条整理的，具体技术措施及要求按照 DB11/T 632—2009中第9章及附录A.5的规定执行。',
        '检查古树名木地上的支撑、加固、拉纤、围栏等保护设施，做好润滑、防腐等维护工作。',
        `根据古树名木主要病虫害为害特点和天气状况，加强早春病虫害预测预报，应做好以下工作:
        a)二月中旬开始重点防治草履蚡、油松毛虫等叶部害虫，可在常发生危害的古树名木树千上缠塑料环或涂药环。
b)二月下旬设饵木诱杀常绿古树蛀干害虫成虫,以双条杉天牛和小蠹甲为主,常以直径4cm 以上、
长1m~2m的新鲜柏木堆，放在生长衰弱柏树附近的向阳处，引诱成虫产卵并人工捕杀成虫。诱杀结束后及时收集饵木并销毁。
c)三月上旬开始常绿古树名木全年第一次集中喷药封干，重点防治蛀干害虫和叶部害虫，具体技
术措施及要求按照 DB11/T 632—2009中第6章及附录A.2的规定执行。
d)落叶古树名木展叶后喷药防治叶部害虫，如蚜虫、介壳虫、叶螨等。具体技术措施及要求按照
DB11/T 632——2009中第6章及附录A.2的规定执行。`,
        '根据当年气候特点、树种特性和土壤含水量状况，适时浇灌返青水。具体技术措施按照DB11/T632——2009中 5.2.3的规定执行。',
        '二月下旬可向常绿古树名木树冠喷水，清除叶面落尘和部分害虫越冬代卵或幼虫。',
        '可结合土壤和树木分析结果，进行配方施肥，以适量腐熟有机肥为宜。',
        '古树名木树体有外伤的，应进行消毒、防腐保护处理。'
      ]
      break
    case 'summer':
      state.title = '夏季'
      state.content = ''
      break
    case 'autumn':
      state.title = '秋季'
      state.content = ''
      break
    case 'winter':
      state.title = '冬季'
      state.content = ''
      break
  }
}

const emit = defineEmits(['handleClose'])

const handleClose = () => {
  emit('handleClose')
}
</script>
