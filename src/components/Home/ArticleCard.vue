<script setup lang="ts">
import {defineProps} from 'vue';
import {isMobile} from "@/utils/isMobile";
import MJTXCard from "@/components/publicUI/MJTXCard.vue";
import {IArticle} from "@/api/types";
import MJTXTag from "@/components/publicUI/MJTXTag.vue";
import MJTXRouterLink from "@/components/publicUI/MJTXRouterLink.vue";
import { imgToThumb } from '@/utils/imgToThumb';

const props = defineProps<{
  article: IArticle
}>()

</script>

<template>
  <MJTXCard class="article-card" :background="props.article.image_url ? imgToThumb(props.article.image_url,640) : '#'" background-blur>
    <div class="article-isTop" v-if="props.article.is_top">TOP</div>

    <div class="article-img" v-if="props.article.image_url">
      <img :src="imgToThumb(props.article.image_url, 640)" alt="img">
    </div>

    <div class="article-info" :style="{'width': props.article.image_url ? '70%' :'100%'}">
      <div class="article-top">
        <h2>
          <MJTXRouterLink :to="props.article.is_link ? props.article.source_url! : `/article/${props.article.uuid}`">
            {{ props.article.title }}
          </MJTXRouterLink>
        </h2>
        <span>{{ props.article.description }}</span>
      </div>

      <div class="article-bottom">
        <div class="article-tip">
          <div class="article-icon icon-author" v-if="!isMobile()"></div>
          <MJTXTag tag="原创" v-if="props.article.is_original" size="12px" :round="false"/>
          <span v-if="!isMobile()">{{ props.article.author }}</span>
          <div class="article-icon icon-date"></div>
          <span>{{ props.article.create_time!.substring(0,10) }}</span>
        </div>
        <div class="article-tip" v-if="!isMobile()">
          <router-link v-for="(category,index) in props.article.categories" :key="index" :to="`/list/category/${category}`" >
            <div class="article-icon icon-category" ></div>
            <span>{{props.article.categories_name?.[index]}}</span>
          </router-link>
        </div>
      </div>

    </div>
  </MJTXCard>
</template>

<style scoped lang="scss">
.article-card{
  height: 210px;
  margin-bottom: 20px;
  display: flex;
  overflow: hidden;
}
.article-isTop{
  position: absolute;
  top: 18px;
  left: 0;
  background-color: #ff4d4f;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 3px 8px;
  z-index: 2;
}
.article-img{
  width: 30%;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
  img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 1;
    &:hover{
      transform: scale(1.1);
    }
  }
}

.article-info{
  z-index: 1;
  color: white;
  text-shadow: 0 .1875rem .3125rem rgba(0, 0, 0, .3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-top{
  margin: 20px 40px 0 40px;
  h2{
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 25px;

    a{
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  span{
    margin-top: 10px;
    font-size: 14px;
    line-height: 25px;

    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-indent: 2em;
    word-break: break-all;
  }
}
.article-bottom{
  font-size: 14px;
  margin: 20px 40px;
  bottom: 20px;
  display: flex;
  justify-content: space-between;

  .article-icon{
    background-size: contain;
    width: 16px;
    height: 16px;
    margin: 0 5px 0 10px;
  }
  .icon-author{
    background-image: url("../../assets/author.svg");
  }
  .icon-date{
    background-image: url("../../assets/time.svg");
  }
  .icon-category{
    background-image: url("../../assets/Category.svg");
  }
  .article-tip{
    display: flex;
    align-items: center;
    a{
      display: flex;
      align-items: center;
    }
  }
}
</style>
