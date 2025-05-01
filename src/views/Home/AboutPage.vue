<script setup lang="ts">
  import BannerBox from '@/components/Home/BannerBox.vue';
  import MJTXTimeLine from '@/components/publicUI/MJTXTimeLine.vue';
  import MJTXCard from '@/components/publicUI/MJTXCard.vue';
  import MJTXTextLine from '@/components/publicUI/MJTXTextLine.vue';
  import { IWebsiteNavigation } from '@/api/types';
  import { random } from 'lodash';
  import { defaultWebsiteNavigation } from '@/api/websiteSetting';

  const pageSetting: IWebsiteNavigation[] = JSON.parse(
    localStorage.getItem('web_navigate') || '[]',
  );
  const pageSettingItem: IWebsiteNavigation = pageSetting.find(
    item => item.nav_url === '/about',
  ) || {
    ...defaultWebsiteNavigation,
  };
  const rand = random(pageSettingItem.nav_banner.length - 1, false);
</script>

<template>
  <BannerBox
    :title="pageSettingItem.nav_title"
    :sub-title="pageSettingItem.nav_subtitle"
    :banner-image="pageSettingItem.nav_banner[rand]"
    type="page" />
  <div class="about">
    <div class="about-textLine">
      <MJTXTextLine text="Time Line" size="26px" />
    </div>
    <MJTXCard padding>123</MJTXCard>
    <div class="about-textLine">
      <MJTXTextLine text="Time Line" size="26px" />
    </div>
    <MJTXCard padding>
      <MJTXTimeLine
        time="2024"
        time-size="large"
        event="event text"
        description="the description of event" />
      <MJTXTimeLine time="07/01" time-size="medium"
        ><div>123</div></MJTXTimeLine
      >
      <MJTXTimeLine event="test text" />
      <MJTXTimeLine time="06/23" event="event text" />
    </MJTXCard>
  </div>
</template>

<style scoped lang="scss">
  .about {
    max-width: var(--max-width);
    min-height: var(--min-height);
    margin: 20px auto;

    .about-textLine {
      padding: 10px 0 0 30px;
    }

    .mjtx-card {
      margin-top: 20px;
    }
  }
</style>
