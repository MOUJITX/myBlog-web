<script setup lang="ts">
  import MJTXCard from '@/components/publicUI/MJTXCard.vue';
  import { defineProps } from 'vue';
  import { IArticleMenu } from '@/api/types';

  const props = defineProps<{
    menu: IArticleMenu[];
  }>();
</script>

<template>
  <MJTXCard title="目录">
    <el-scrollbar max-height="500px">
      <div
        v-for="(item, index) in props.menu"
        :key="index"
        class="article-menu">
        <a :href="`#${item.elementID}`">
          <li :style="`padding-left:${(item.level - 1) * 20 + 15}px`">
            {{ item.title }}
          </li>
        </a>
      </div>
    </el-scrollbar>
  </MJTXCard>
</template>
<style scoped lang="scss">
  .article-menu {
    li {
      list-style: none;
      line-height: 2;
      cursor: pointer;
      font-size: 15px;
      text-align: justify;
      color: var(--color-black);
      padding-right: 15px;
      margin: 5px 0;
      &:hover {
        color: var(--el-color-primary);
        background-color: var(--color-whitegray);
      }
    }
  }
</style>
