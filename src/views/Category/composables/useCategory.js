//category相关业务
import { ref, onMounted } from 'vue'
import { getTopCategoryAPI } from '@/api/category'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const route = useRoute()
  const categoryData = ref({})
  const getCategory = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id)
    categoryData.value = res.data.result
  }
  onMounted(() => getCategory())
  //路由变化时分类接口重新发送
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })
  return {
    categoryData,
  }
}
