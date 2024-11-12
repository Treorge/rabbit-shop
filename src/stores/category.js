import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/api/layout'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])

  const getCategoryList = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.data.result
  }

  return { categoryList, getCategoryList }
})
