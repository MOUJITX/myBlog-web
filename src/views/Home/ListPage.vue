<script setup lang="ts">
  import BannerBox from '@/components/Home/BannerBox.vue';
  import { useRoute } from 'vue-router';
  import ArticleCard from '@/components/Home/ArticleCard.vue';
  import { onMounted, ref } from 'vue';
  import { defaultTag, selectTagByID } from '@/api/tag';
  import { ElNotification } from 'element-plus';
  import { ITag, ICategory, IArticle } from '@/api/types';
  import { defaultCategory, selectCategoryByID } from '@/api/category';
  import { defaultSearchArticle, getArticlesList } from '@/api/article';
  import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';
  const route = useRoute();
  const pageType = route.params.type as string;
  const pageUUID = route.params.title as string;

  const tagInfo = ref<ITag>({ ...defaultTag });
  const categoryInfo = ref<ICategory>({ ...defaultCategory });

  const searchForm = ref<IArticle>({ ...defaultSearchArticle });

  const dataList = ref<IArticle[]>([]);
  const listQuery = ref({ currentPage: 1, pagesize: 10 });
  const total = ref(0);

  const getDataList = () => {
    if (pageType === 'tag') {
      selectTagByID(pageUUID).then(res => {
        if (!res || res.data === null) {
          ElNotification.error({ title: '该标签不存在', zIndex: 100000 });
          return;
        }
        tagInfo.value = res.data;
      });
      searchForm.value.tags = [pageUUID];
    } else {
      selectCategoryByID(pageUUID).then(res => {
        if (!res || res.data === null) {
          ElNotification.error({ title: '该栏目不存在', zIndex: 100000 });
          return;
        }
        categoryInfo.value = res.data;
      });
      searchForm.value.categories = [pageUUID];
    }
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
</script>

<template>
  <BannerBox
    type="page"
    :title="pageType === 'tag' ? `#${tagInfo.tag}` : categoryInfo.category"
    :banner-image="
      pageType === 'tag' ? tagInfo.banner_image : categoryInfo.banner_image
    " />
  <div class="list">
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
</template>

<style scoped lang="scss">
  .list {
    max-width: var(--max-width);
    min-height: var(--min-height);
    margin: 20px auto;
  }
</style>
