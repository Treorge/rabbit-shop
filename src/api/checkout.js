//订单结算

import httpInstance from '@/utils/http'

//获取订单信息
export const getCheckoutInfoAPI = () => {
  return httpInstance({
    url: 'member/order/pre',
  })
}

//创建订单
export const createOrderAPI = (data) => {
  return httpInstance({
    url: 'member/order',
    method: 'POST',
    data,
  })
}
