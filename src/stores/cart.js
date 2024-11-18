//购物车模块
import { getGoodsAPI } from '@/api/home'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])

    //添加商品到购物车
    const addCart = (goods) => {
      //购物车中添加过该商品，直接加数量
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }

    //删除购物车列表商品
    const delCart = (skuId) => {
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }

    //计算商品数量和总价
    const allCount = computed(() => cartList.value.reduce((all, good) => all + good.count, 0))
    const allPrice = computed(() =>
      cartList.value.reduce((all, good) => all + good.count * good.price, 0),
    )

    return {
      cartList,
      allCount,
      allPrice,
      addCart,
      delCart,
    }
  },
  {
    persist: true,
  },
)
