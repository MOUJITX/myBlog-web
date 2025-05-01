<script setup lang="ts">
  import BannerBox from '@/components/Home/BannerBox.vue';
  import ArticleCard from '@/components/Home/ArticleCard.vue';
  import WebInfo from '@/components/Home/WebInfo.vue';
  import TagCard from '@/components/Home/TagCard.vue';
  import CategoryCard from '@/components/Home/CategoryCard.vue';
  import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';
  import { onMounted, ref } from 'vue';
  import { defaultSearchArticle, getArticlesList } from '@/api/article';
  import { IArticle } from '@/api/types';
  import { isMobile } from '@/utils/isMobile';
  import { random } from 'lodash';

  const listQuery = ref({ currentPage: 1, pagesize: 10 });
  const total = ref(0);

  const searchForm = ref<IArticle>({ ...defaultSearchArticle });

  const dataList = ref<IArticle[]>([]);

  const title = localStorage.getItem('web_title') || undefined;
  const subTitle = localStorage.getItem('web_subtitle') || undefined;

  const getDataList = async () => {
    getArticlesList(
      listQuery.value.currentPage,
      listQuery.value.pagesize,
      searchForm.value,
    ).then(res => {
      if (!res) return;
      dataList.value = res.data.list;
      total.value = res.data.total;
    });
  };

  onMounted(() => {
    getDataList();
  });

  const web_banner: string[] = (
    localStorage.getItem('web_banner') || '[]'
  ).split(',');
  const rand = random(web_banner.length - 1, false);
</script>

<template>
  <BannerBox
    type="home"
    :title="title"
    :sub-title="subTitle"
    :banner-image="web_banner[rand]" />
  <div class="home">
    <div :style="{ width: isMobile() ? '100%' : '70%' }">
      <ArticleCard
        v-for="(item, index) in dataList"
        :article="item"
        :key="index" />
      <MJTXPagination
        position="center"
        layout="prev, pager, next"
        v-model:current-page="listQuery.currentPage"
        v-model:page-size="listQuery.pagesize"
        :total="total"
        @handleChange="getDataList()" />
    </div>
    <div class="home-info" v-if="!isMobile()">
      <WebInfo />
      <TagCard />
      <CategoryCard />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .home {
    max-width: var(--max-width);
    min-height: var(--min-height);
    margin: 20px auto;

    display: flex;
    justify-content: space-between;
  }

  .home-info {
    width: 30%;
  }
</style>
