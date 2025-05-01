<script setup lang="ts">
  import BannerBox from '@/components/Home/BannerBox.vue';
  import { useRoute } from 'vue-router';
  import ArticleCard from '@/components/Home/ArticleCard.vue';
  import { onMounted, ref, watch } from 'vue';
  import { ElNotification } from 'element-plus';
  import { IArticle } from '@/api/types';
  import { defaultSearchArticle, getArticlesList } from '@/api/article';
  import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';
  import { random } from 'lodash';
  import ArticleSearch from '@/components/Home/ArticleSearch.vue';

  const route = useRoute();
  const searchInput = ref('');

  const searchForm = ref<IArticle>({
    ...defaultSearchArticle,
  });

  const dataList = ref<IArticle[]>([]);
  const listQuery = ref({ currentPage: 1, pagesize: 10 });
  const total = ref(0);

  const getDataList = () => {
    searchInput.value = route.params.search as string;
    if (!searchInput.value) {
      ElNotification.error({ title: '请输入搜索内容', zIndex: 100000 });
      return;
    }
    searchForm.value.title = searchInput.value;
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

  watch(
    () => route.params.search,
    () => getDataList(),
  );

  const web_banner: string[] = (
    localStorage.getItem('web_banner') || '[]'
  ).split(',');
  const rand = random(web_banner.length - 1, false);
</script>

<template>
  <BannerBox
    type="page"
    :title="searchInput"
    :banner-image="web_banner[rand]"
    sub-title="搜索结果" />
  <div class="list" v-if="dataList.length > 0">
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
  <div v-else class="list">
    <div class="list-empty"></div>
    <div class="list-empty-text">
      <div>似乎没有找到内容？换个词试试</div>
      <ArticleSearch />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .list {
    max-width: var(--max-width);
    min-height: var(--min-height);
    margin: 20px auto;
  }
  .list-empty {
    background-image: url('../../assets/empty.svg');
    width: 100%;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .list-empty-text {
    display: flex;
    font-size: 20px;
    color: #999;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
</style>
