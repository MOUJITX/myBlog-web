<script setup lang="ts">
import MJTXCard from '@/components/publicUI/MJTXCard.vue';
import { IWebsiteConcat } from '@/api/types';
import { imgToThumb } from '@/utils/imgToThumb';

const profile_avatar = localStorage.getItem('profile_avatar');
const profile_nick = localStorage.getItem('profile_nick');
const profile_slogan = localStorage.getItem('profile_slogan');
const profile_background = localStorage.getItem('profile_background');
const profile_concat: IWebsiteConcat[] = JSON.parse(
  localStorage.getItem('profile_concat') || '[]',
);
</script>

<template>
  <MJTXCard :z-index="100">
    <div class="web-top">
      <div
        class="web-user"
        :style="{
          'background-image': `linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1) 70%), url(${imgToThumb(profile_background as string, 640)})`,
        }">
        <img :src="imgToThumb(profile_avatar as string, 128)" alt="avatar" />
      </div>
      <div class="web-username">{{ profile_nick }}</div>
      <div class="web-slogan">
        {{ profile_slogan }}
      </div>
    </div>
    <div class="web-bottom">
      <a
        class="web-contact-icon"
        v-for="(item, key) in profile_concat"
        :key="key"
        :href="item.cc_url"
        target="_blank"
        :title="item.cc_name">
        <img :src="imgToThumb(item.cc_icon, 64)" :alt="item.cc_name" />
        <div class="web-contact-icon-qrcode" v-if="item.cc_value">
          {{ item.cc_value }}
        </div>
      </a>
    </div>
  </MJTXCard>
</template>

<style scoped lang="scss">
.web-top {
  border-radius: var(--card-border-radius) var(--card-border-radius) 0 0;
  text-align: center;
  //padding-bottom: 10px;
  overflow: visible;
}
.web-bottom {
  height: 70px;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.web-user {
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  border-radius: var(--card-border-radius) var(--card-border-radius) 0 0;
  color: white;
  padding-top: 90px;
}
.web-user img {
  width: 72px;
  height: 72px;
  border-radius: 100%;
  margin: 15px;
  box-shadow: gray 0 0 5px;

  &:hover {
    transform: rotate(360deg);
  }
}
.web-username {
  font-size: 24px;
  font-weight: 700;
}
.web-slogan {
  margin: 15px 15px;
}
.web-contact-icon {
  position: relative;
  overflow: visible;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &:hover .web-contact-icon-qrcode {
    display: block;
  }

  .web-contact-icon-qrcode {
    position: absolute;
    top: 36px;
    left: -38px;
    width: 128px;
    height: 128px;
    background-color: white;
    box-shadow: var(--box-shadow);
    border-radius: var(--card-border-radius);
    display: none;
    padding: 5px;
    cursor: auto;
  }
}
.web-contact-icon img {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  padding: 0 15px;
}
</style>
