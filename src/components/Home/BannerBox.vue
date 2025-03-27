<script setup lang="ts">
import {defineProps, PropType} from 'vue';
import WaveBox from "@/components/Home/WaveBox.vue";
import { imgToThumb } from '@/utils/imgToThumb';

const props = defineProps({
  type:{
    type: String as PropType<'home' | 'article' | 'page' | 'custom'>,
  },
  title:{
    type: String,
  },
  subTitle:{
    type: String,
  },
  bannerImage:{
    type: String,
    default: "background.jpg"
  },
  blur:{
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="banner-box"
       :style="`background-image:url(${imgToThumb(props.bannerImage, 1920)})`">
    <div class="overlay" :style="{'backdrop-filter': `blur(${props.blur ? 5 : 0}px)`}" >
      <WaveBox class="wave-box"/>
      <div class="home-title" v-if="props.type === 'home'">
        <h2>{{ props.title }}</h2>
        <span>{{ props.subTitle }}</span>
      </div>
      <div class="article-title" v-else-if="props.type === 'page'">
        <h2 class="page-title">{{ props.title }}</h2>
        <span class="page-title page-subtitle">{{ props.subTitle }}</span>
      </div>
      <div class="article-title" v-else-if="props.type === 'custom'">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner-box{
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  width: 100%;
}
.overlay{
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
  color: white;
  padding-top: 25px;
  //text-shadow: var(--color-black) 3px 3px 10px;
  position: relative;
}
.home-title{
  height: var(--banner-height-home);
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 36px;

  margin: 0 auto;
  max-width: var(--max-width);

  text-align: center;

  text-shadow: var(--text-shadow);
}
.article-title{
  height: var(--banner-height-page);
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;

  margin: 0 auto;
  max-width: var(--max-width);
}
.page-title{
  width: 100%;
  text-align: center;
  text-shadow: var(--text-shadow);
}
.page-subtitle{
  margin-top: 20px;
  font-size: 20px;
  letter-spacing: 2px;
  font-family: "Times New Roman",serif;
}
.overlay h2{
  letter-spacing: 10px;
  font-family: "方正小标宋简体",serif;
}
.home-title span{
  margin-top: 20px;
  font-size: 20px;
  letter-spacing: 2px;
  font-family: "Times New Roman",serif;
}
.wave-box{
  height: 100px;
}
</style>
