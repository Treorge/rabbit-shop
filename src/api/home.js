import httpInstance from '@/utils/http'

export function getBannerAPI(params = {}) {
  //设置默认值为1：首页，2：商品
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite,
    },
  })
}

export const getNewAPI = () => {
  return httpInstance({
    url: '/home/new',
  })
}

export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot',
  })
}

export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods',
  })
}
