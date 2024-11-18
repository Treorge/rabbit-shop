//购物车模块
import { getGoodsAPI } from '@/api/home'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { delCartAPI, findCartListAPI, inserCartAPI, mergeCartAPI } from '@/api/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const token = computed(() => userStore.userInfo.token)
    const cartList = ref([])

    //获取最新购物车列表
    const getNewCartList = async () => {
      const res = await findCartListAPI()
      cartList.value = res.data.result
    }

    //添加商品到购物车
    const addCart = async (goods) => {
      const { skuId, count } = goods

      if (token.value) {
        //登录之后
        getNewCartList()
        await inserCartAPI({ skuId, count })
      } else {
        //购物车中添加过该商品，直接加数量
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          item.count += goods.count
        } else {
          cartList.value.push(goods)
        }
      }
    }

    //删除购物车列表商品
    const delCart = async (skuId) => {
      if (token) {
        await delCartAPI([skuId])
        getNewCartList()
      } else {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
      }
    }

    //清除购物车数据
    const clearCartList = () => {
      cartList.value = []
    }

    //合并购物车
    const mergeCartList = async () => {
      await mergeCartAPI(
        cartList.value.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          }
        }),
      )
      getNewCartList()
    }

    //计算商品数量和总价
    const allCount = computed(() => cartList.value.reduce((all, good) => all + good.count, 0))
    const allPrice = computed(() =>
      cartList.value.reduce((all, good) => all + good.count * good.price, 0),
    )

    //单选框功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }

    //全选功能
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    //选中商品的数量和价格
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, s) => a + s.count, 0),
    )

    const selectedPrice = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, s) => a + s.price * s.count, 0),
    )

    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      addCart,
      delCart,
      singleCheck,
      allCheck,
      clearCartList,
      mergeCartList,
      getNewCartList,
    }
  },
  {
    persist: true,
  },
)
