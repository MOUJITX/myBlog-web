<script setup lang="ts">
  import BannerBox from '@/components/Home/BannerBox.vue';
  import MJTXTextLine from '@/components/publicUI/MJTXTextLine.vue';
  import InfoCard from '@/components/Home/InfoCard.vue';
  import { onMounted, ref } from 'vue';
  import { IResumeSection, IWebsiteNavigation } from '@/api/types';
  import { getResumesPublic } from '@/api/resume';
  import { random } from 'lodash';
  import { isMobile } from '@/utils/isMobile';

  const resumes = ref<IResumeSection[]>([]);

  onMounted(() => {
    getResumesPublic().then(res => {
      resumes.value = res.data;
    });
  });

  const pageSettingItem: IWebsiteNavigation = JSON.parse(
    localStorage.getItem('web_navigate') || '[]',
  ).find((item: { nav_url: string }) => item.nav_url === '/resume');
  const rand = random(pageSettingItem.nav_banner.length - 1, false);
</script>

<template>
  <BannerBox
    :title="pageSettingItem.nav_title"
    :sub-title="pageSettingItem.nav_subtitle"
    :banner-image="pageSettingItem.nav_banner[rand]"
    type="page" />
  <div class="resume">
    <div
      v-for="(resume, index) in resumes"
      :key="index"
      :style="!isMobile() && {
        'min-width': resume.min_width + '%',
        'max-width': resume.max_width + '%',
      }">
      <MJTXTextLine :text="resume.section" size="26px" />
      <div :class="resume.isrow ? 'resume-skill-apps' : ''">
        <InfoCard
          v-for="(item, resumeIndex) in resume.resumes"
          :key="resumeIndex"
          :icon="item.icon.icon"
          :icon-background="item.icon.backgroundColor"
          :icon-padding="item.icon.iconPadding"
          :icon-type="item.icon.iconType"
          :icon-color="item.icon.textColor"
          :description="item.description"
          :isopen="item.isopen"
          :sub-title="item.subtitle"
          :title="item.title"
          :direction="item.direction"
          :min-width="item.min_width"
          :max-width="item.max_width" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .resume-banner {
    height: var(--banner-height-page);
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    text-align: center;
  }
  .resume {
    max-width: var(--max-width);
    min-height: var(--min-height);
    margin: 20px auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .resume-skill-apps {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
