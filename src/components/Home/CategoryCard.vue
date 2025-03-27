<script setup lang="ts">

import MJTXCard from "@/components/publicUI/MJTXCard.vue";
import {onMounted, ref} from "vue";
import {ICategory} from "@/api/types";
import {getCategories} from "@/api/category";
import MJTXTree from "@/components/publicUI/MJTXTree.vue";
const categories = ref<ICategory[]>()
const getAllCategories = () => {
  getCategories().then(res=>{
    if (!res) return;
    categories.value = res.data[0].children
  })
}
onMounted(()=>{
  getAllCategories()
})
</script>

<template>
  <MJTXCard class="category-card" title="目录 Category">
    <MJTXTree :tree="categories" gotoPath="list/category/"/>
  </MJTXCard>
</template>

<style scoped lang="scss">
.category-card{
  margin-top: 20px;
}
</style>
