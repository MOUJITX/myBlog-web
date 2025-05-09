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
  import MJTXError from '@/components/publicUI/MJTXError.vue';

  const route = useRoute();
  const articleUUID = route.params.uuid as string;

  const articleData = ref<IArticle>({ ...defaultArticle });
  const articleMenu = ref<IArticleMenu[]>([]);
  const showMenu = ref(true);

  const needViewCode = ref<boolean>(false);
  const viewCode = ref<string>();
  const viewCodeTip = ref<string>();

  const getDate = () => {
    getArticleByUUID(articleUUID, viewCode.value).then(res => {
      if (!res) return;

      if (res.data.is_private) {
        needViewCode.value = true;
        viewCodeTip.value = res.data.full_content;
        articleData.value = res.data;
        return;
      }

      needViewCode.value = false;
      articleData.value = res.data;
      articleMenu.value = extractTitles(res.data.full_content);
      // console.log(articleMenu.value);
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
    <div v-if="articleData.is_public">
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
      <h3 class="article-banner_title" v-if="isMobile()">{{ articleData.title }}</h3>
      <h1 class="article-banner_title" v-else>{{ articleData.title }}</h1>
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
    </div>
  </BannerBox>
  <div class="article" v-if="articleData.is_public && !needViewCode">
    <div :style="`width:${showMenu && !isMobile() ? '70%' : '100%'}`">
      <ArticleContent :html="articleData.full_content!" />
      <ArticleComment v-if="articleData.is_comment && func_comment" />
    </div>
    <MJTXAffix class="article-menu" v-if="showMenu && !isMobile()" :offset="60">
      <ArticleMenu :menu="articleMenu" />
    </MJTXAffix>
  </div>
  <MJTXError v-else-if="needViewCode" :text="viewCodeTip" class="article-viewCode">
    <input v-model="viewCode" @keyup.enter="getDate()" type="password" autocomplete="false"/>
    <button @click="getDate()">确 认</button>
  </MJTXError>
  <MJTXError text="页面未找到" type="notFound" v-else/>
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

    word-break: break-all;
    hyphens: auto;
  }

  .article-viewCode {

    input {
      height: 30px;
      border: 1px solid #acaaaa;
      border-radius: 10px;
      width: 300px;
      padding: 0 10px;
      text-align: center;
    }

    button {
      height: 30px;
      border: 1px solid #acaaaa;
      border-radius: 10px;
      width: 100px;
      text-align: center;

      &:hover {
        background: #dddddd;
        cursor: pointer;
      }
    }
  }
</style>
