<script setup lang="ts">
  import BannerBox from '@/components/Home/BannerBox.vue';
  import { IPhoto, IWebsiteNavigation } from '@/api/types';
  import { random } from 'lodash';
  import PhotoShow from '@/components/Home/PhotoShow.vue';
  import { onMounted, ref } from 'vue';
  import { getPhotoList } from '@/api/photo';
  import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';

  const pageSettingItem: IWebsiteNavigation = JSON.parse(
    localStorage.getItem('web_navigate') || '[]',
  ).find((item: { nav_url: string }) => item.nav_url === '/photo');
  const rand = random(pageSettingItem.nav_banner.length - 1, false);

  const listData = ref<IPhoto[]>([]);
  const listQuery = ref({ currentPage: 1, pagesize: 12 });
  const total = ref(10);

  const getDataList = () => {
    getPhotoList(listQuery.value.currentPage, listQuery.value.pagesize).then(
      res => {
        if (!res) return;
        listData.value = res.data.list;
        total.value = res.data.total;
      },
    );
  };

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
  <div class="photo">
    <div class="photo-list">
      <PhotoShow
        v-for="(photo, index) in listData"
        :key="index"
        :index="index"
        :title="photo.title"
        :uuid="photo.uuid"
        :photo="photo.index_img" />
    </div>
    <MJTXPagination
      v-if="total >= listQuery.pagesize"
      position="center"
      layout="prev, pager, next"
      v-model:current-page="listQuery.currentPage"
      v-model:page-size="listQuery.pagesize"
      :total="total"
      @handleChange="getDataList()" />
  </div>
</template>

<style scoped lang="scss">
  .photo {
    max-width: var(--max-width);
    min-height: var(--min-height);
    margin: 20px auto;

    .photo-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
