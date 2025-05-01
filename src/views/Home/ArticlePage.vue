<script setup lang="ts">
  import BannerBox from '@/components/Home/BannerBox.vue';
  import ArticleContent from '@/components/Home/ArticleContent.vue';
  import ArticleComment from '@/components/Home/ArticleComment.vue';
  import ArticleMenu from '@/components/Home/ArticleMenu.vue';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { IArticle, IArticleMenu } from '@/api/types';
  import { defaultArticle, getArticleByUUID } from '@/api/article';
  import extractTitles from '@/utils/extractTitles';
  import { isMobile } from '@/utils/isMobile';
  import MJTXAffix from '@/components/publicUI/MJTXAffix.vue';
  import MJTXTag from '@/components/publicUI/MJTXTag.vue';
  import MJTXInline from '@/components/publicUI/MJTXInline.vue';
  import MJTXRouterLink from '@/components/publicUI/MJTXRouterLink.vue';

  const route = useRoute();
  const articleUUID = route.params.uuid as string;

  const articleData = ref<IArticle>({ ...defaultArticle });
  const articleMenu = ref<IArticleMenu[]>([]);
  const showMenu = ref(true);

  const getDate = () => {
    getArticleByUUID(articleUUID).then(res => {
      if (!res) return;
      articleData.value = res.data;
      articleMenu.value = extractTitles(res.data.full_content);
      console.log(articleMenu.value);
      if (articleMenu.value.length === 0) showMenu.value = false;
    });
  };

  onMounted(() => {
    getDate();
  });

  const func_comment = localStorage.getItem('func_comment') === 'true';
</script>

<template>
  <BannerBox
    type="custom"
    :title="articleData.title!"
    :banner-image="articleData.image_url"
    blur>
    <MJTXInline>
      <router-link
        v-for="(item, index) in articleData.categories_name"
        :key="index"
        :to="`/list/category/${articleData.categories?.[index]}`">
        <MJTXTag :tag="item" size="14px" round />
      </router-link>
      <router-link
        v-for="(item, index) in articleData.tags_name"
        :key="index"
        :to="`/list/tag/${articleData.tags?.[index]}`">
        <MJTXTag :tag="item" size="14px" round before theme="none" shadow />
      </router-link>
    </MJTXInline>
    <h1 class="article-banner_title">{{ articleData.title }}</h1>
    <MJTXInline position="center">
      <div class="article-banner_icon article-banner_author"></div>
      <MJTXTag
        tag="原创"
        size="14px"
        :round="false"
        v-if="articleData.is_original" />
      <MJTXRouterLink :to="articleData.source_url!" v-else>
        <MJTXTag tag="转载" size="14px" :round="false" />
      </MJTXRouterLink>
      <span class="article-banner_tip">{{ articleData.author }}</span>
      <div class="article-banner_icon article-banner_date" />
      <span class="article-banner_tip">{{
        articleData.create_time!.substring(0, 10)
      }}</span>
    </MJTXInline>
  </BannerBox>
  <div class="article" v-if="articleData.is_public">
    <div :style="`width:${showMenu && !isMobile() ? '70%' : '100%'}`">
      <ArticleContent :html="articleData.full_content!" />
      <ArticleComment v-if="articleData.is_comment && func_comment" />
    </div>
    <MJTXAffix class="article-menu" v-if="showMenu && !isMobile()" :offset="60">
      <ArticleMenu :menu="articleMenu" />
    </MJTXAffix>
  </div>
  <div class="article" v-else>
    <div class="article-notFound"></div>
  </div>
</template>

<style scoped lang="scss">
  .article {
    max-width: var(--max-width);
    min-height: var(--min-height);
    margin: 20px auto;

    display: flex;
    justify-content: space-between;
  }
  .article-menu {
    width: 30%;
  }

  .article-banner_tip {
    font-size: 15px;
    margin-right: 20px;
    text-shadow: var(--text-shadow);
  }

  .article-banner_icon {
    background-size: contain;
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }

  .article-banner_author {
    background-image: url('../../assets/author.svg');
  }

  .article-banner_date {
    background-image: url('../../assets/time.svg');
  }

  .article-banner_title {
    padding-top: 10px;
    padding-bottom: 20px;
    text-shadow: var(--text-shadow);
  }

  .article-notFound {
    background-image: url('../../assets/404.svg');
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
