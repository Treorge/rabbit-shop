import { loginAPI } from '@/api/user'

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})

    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.data.result
    }

    const clearUserInfo = () => {
      userInfo.value = {}
    }

    // const getToken = () => {
    //   token.value = userInfo.value.token
    // }

    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: true,
  },
)
