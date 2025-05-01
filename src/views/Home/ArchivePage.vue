<script setup lang="ts">
  import BannerBox from '@/components/Home/BannerBox.vue';
  import { onMounted, ref } from 'vue';
  import { IArticle, IArticleByYear, IWebsiteNavigation } from '@/api/types';
  import { defaultSearchArticle, getArticlesList } from '@/api/article';
  import { dateFormat } from '../../utils/date';
  import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';
  import MJTXRouterLink from '@/components/publicUI/MJTXRouterLink.vue';
  import { random } from 'lodash';

  const listQuery = ref({ currentPage: 1, pagesize: 20 });
  const total = ref(0);
  const searchForm = ref<IArticle>({ ...defaultSearchArticle });
  const dataList = ref<IArticleByYear[]>([]);
  const topDataList = ref<IArticle[]>([]);
  const getDataList = async () => {
    topDataList.value = [];
    getArticlesList(
      listQuery.value.currentPage,
      listQuery.value.pagesize,
      searchForm.value,
    ).then(res => {
      if (!res) return;
      total.value = res.data.total;
      dataList.value = transferToYearArticle(res.data.list);
    });
  };

  const transferToYearArticle = (articles: IArticle[]): IArticleByYear[] => {
    let yearArticle: IArticleByYear[] = [];

    articles.forEach((article: IArticle) => {
      if (article.is_top) {
        topDataList.value.push(article);
        return;
      }
      let year = article.create_time?.split('-')[0] || '';
      let yearIndex = yearArticle.findIndex(item => item.year === year);
      if (yearIndex === -1) {
        yearArticle.push({
          year: year,
          articles: [article],
        });
      } else {
        yearArticle[yearIndex].articles.push(article);
      }
    });
    return yearArticle;
  };

  const pageSettingItem: IWebsiteNavigation = JSON.parse(
    localStorage.getItem('web_navigate') || '[]',
  ).find((item: { nav_url: string }) => item.nav_url === '/archive');
  const rand = random(pageSettingItem.nav_banner.length - 1, false);

  onMounted(() => {
    getDataList();
  });
</script>

<template>
  <BannerBox
    :title="pageSettingItem.nav_title"
    :sub-title="pageSettingItem.nav_subtitle"
    :banner-image="pageSettingItem.nav_banner[rand]"
    type="page" />
  <div class="archive">
    <div class="archive-list" v-if="topDataList.length > 0">
      <MJTXRouterLink
        class="archive-article"
        v-for="(article, index) in topDataList"
        :key="index"
        :to="
          article.is_link ? article.source_url! : `/article/${article.uuid}`
        ">
        <div class="archive-title archive-title_top">{{ article.title }}</div>
        <div class="archive-date">
          {{ dateFormat(article.create_time, 'YYYY/MM/DD') }}
        </div>
      </MJTXRouterLink>
    </div>
    <div
      class="archive-list"
      v-for="(yearItem, index) in dataList"
      :key="index">
      <div class="archive-year">{{ yearItem.year }}</div>
      <MJTXRouterLink
        class="archive-article"
        v-for="(article, index) in yearItem.articles"
        :key="index"
        :to="
          article.is_link ? article.source_url! : `/article/${article.uuid}`
        ">
        <div class="archive-title">{{ article.title }}</div>
        <div class="archive-date">
          {{ dateFormat(article.create_time, 'YYYY/MM/DD') }}
        </div>
      </MJTXRouterLink>
    </div>
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
  .archive {
    max-width: var(--max-width);
    min-height: var(--min-height);
    margin: 20px auto;
  }
  .archive-list {
    border-bottom: 1px gray dashed;
  }
  .archive-year {
    margin: 20px 0 10px 10px;
    font-size: var(--font-size-large);
    border-left: 3px var(--color-black) solid;
    padding-left: 10px;
  }
  .archive-article {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    &:hover {
      background-color: var(--color-whitegray);
      border-radius: var(--card-border-radius);
    }

    &:hover .archive-date {
      background-color: var(--color-black);
      color: white;
      padding: 5px;
      border-radius: var(--card-border-radius);
      text-align: center;
    }
  }
  .archive-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .archive-title_top {
    &:before {
      content: url('../../assets/top.svg');
      display: inline-block;
      width: 16px;
      height: 16px;
      padding-right: 5px;
    }
  }
  .archive-date {
    min-width: 80px;
  }
</style>
