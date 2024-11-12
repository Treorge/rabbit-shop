<script setup>
import HomeCategory from './component/HomeCategory.vue'
import HomeBanner from './component/HomeBanner.vue'
import HomeNew from './component/HomeNew.vue'
import HomeHot from './component/HomeHot.vue'
import HomeProduct from './component/HomeProduct.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
</template>
