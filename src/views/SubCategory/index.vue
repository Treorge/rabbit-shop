<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/api/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '../Home/component/GoodsItem.vue'

//获取面包屑数据
const filterData = ref({})
const route = useRoute()
const getFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  filterData.value = res.data.result
}

onMounted(() => getFilterData())

//获取基础列表数据
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
})

const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = res.data.result.items
}

onMounted(() => getGoodList())

//列表筛选
const tabChange = () => {
  reqData.value.page = 1
  getGoodList()
}

//无限加载数据
const disable = ref(false)
const load = async () => {
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value, ...res.data.result.items]
  //到下一页没有获取到数据为所有数据加载完毕，停止加载
  if (res.data.result.items.length === 0) {
    disable.value = true
  }
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }"
          >{{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
