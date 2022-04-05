<template>
  <div class="curing">
    <el-dialog v-model="visible" :title="title" width="50%" :before-close="handleClose">
      <ul class="infinite-list">
        <li v-for="(item, index) in content" :key="item" class="infinite-list-item">{{ index + 1 }}. {{ item }}</li>
      </ul>
    </el-dialog>
  </div>
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
        '整理清除古树名木枯死枝叶、病虫枝及树下病虫越冬场所等，消灭越冬病虫源。',
        '检查古树名木地上的支撑、加固、拉纤、围栏等保护设施，做好润滑、防腐等维护工作。',
        `根据古树名木主要病虫害为害特点和天气状况，加强早春病虫害预测预报，应做好以下工作:
        a)二月中旬开始重点防治草履蚡、油松毛虫等叶部害虫，可在常发生危害的古树名木树千上缠塑料环或涂药环。
b)二月下旬设饵木诱杀常绿古树蛀干害虫成虫,以双条杉天牛和小蠹甲为主,常以直径4cm 以上、
长1m~2m的新鲜柏木堆，放在生长衰弱柏树附近的向阳处，引诱成虫产卵并人工捕杀成虫。诱杀结束后及时收集饵木并销毁。
c)三月上旬开始常绿古树名木全年第一次集中喷药封干，重点防治蛀干害虫和叶部害虫。
d)落叶古树名木展叶后喷药防治叶部害虫，如蚜虫、介壳虫、叶螨等。`,
        '根据当年气候特点、树种特性和土壤含水量状况，适时浇灌返青水。',
        '二月下旬可向常绿古树名木树冠喷水，清除叶面落尘和部分害虫越冬代卵或幼虫。',
        '可结合土壤和树木分析结果，进行配方施肥，以适量腐熟有机肥为宜。',
        '古树名木树体有外伤的，应进行消毒、防腐保护处理。'
      ]
      break
    case 'summer':
      state.title = '夏季养护技术措施及要求'
      state.content = [
        '根据病虫害发生特点，加强夏季高温、干旱、高湿环境下古树名木病虫害的日常检查与防治。四月中下旬至五月上旬，第二次病虫害集中防治，重点防治常绿和落叶古树名木叶部害虫。五月中下旬生长势衰弱的古树名木可采取树干释放天敌生物如肿腿蜂、蒲螨等防治蛀干害虫。',
        '根据天气状况和土壤含水量，及时浇水并对古树名木保护范围内土壤进行中耕松土。',
        `雨季来临前，对有安全隐患的古树名木，督促完成枝条整理、树体支撑、加固及树洞填充、封堵工程。清理病虫枝，加强树冠通风。`,
        '做好雨季前古树名木地下防涝排水、防止水土流失、护根护坡等地上环境的保护。',
        '根据天气和实际情况，保护古树名木树干，防止日灼，可在主干西晒侧捆绑草绳、麻袋片或临时涂白等。'
      ]
      break
    case 'autumn':
      state.title = '秋季养护技术措施及要求'
      state.content = [
        '加强高温、干旱环境下古树名木病虫害的日常检查和防治。九月上旬开始第三次病虫害集中防治，重点防治常绿和落叶古树名木叶部害虫和蛀干害虫，如叶螨、蚜虫、介壳虫、木蠹蛾等。',
        '根据古树名木生长状况，做好中耕松土、施肥或叶面喷肥工作。',
        '整理清险干枯枝叶，病虫枝,加强树冠通风。',
        '根据天气状况和士壤含水量,适时浇水，防止过早黄叶、落叶。',
        '全面检查古树名木生长状况，生长势衰弱的古树名木可在十月下旬按照计划实施地上地下保护复壮工程。'
      ]
      break
    case 'winter':
      state.title = '冬季养护技术措施及要求'
      state.content = [
        '十一月上旬开始第四次古树名木病虫害集中防治，重点防治准备越冬的叶部害虫，如叶螨、蚜虫、介壳虫等。',
        '采取人工捉、挖、刷、刮、剪等办法，清除古树名木树上及地下土壤和周围隐蔽缝隙处的幼虫.蛹、成虫、茧、卵块等。',
        '整理清除古树名木枯死枝叶、病虫枝，重点清理槐豆荚等。清除树下杂物和带有病原物的落叶，减少病虫源。环境条件允许的可在树干涂药，防虫防病。',
        '整理树下环境卫生，做好古树名木及其周围的安全防火工作。'
      ]
      break
  }
}

const emit = defineEmits(['handleClose'])

const handleClose = () => {
  emit('handleClose')
}
</script>

<style scoped lang="scss">
.infinite-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  margin: 10px;
  //   justify-content: center;
  //   height: 50px;
  //   background: var(--el-color-primary-light-9);
  //   color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.curing:deep(.el-dialog__body) {
  padding-top: 5px;
}
</style>
