import dayjs from 'dayjs'
import { computed, onUnmounted, ref } from 'vue'

export const useCountDown = () => {
  let timer = null
  const time = ref(0)
  //格式化时间
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  //开始倒计时
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
    // if (time.value === 0) {
    //   clearInterval(timer)
    // }
  }

  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    start,
  }
}
