<script setup lang="ts">
  import BannerBox from '@/components/Home/BannerBox.vue';
  import MJTXTextLine from '@/components/publicUI/MJTXTextLine.vue';
  import PhotoShow from '@/components/Home/PhotoShow.vue';
  import { defaultPhoto, selectPhotoByID } from '@/api/photo';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { IPhoto } from '@/api/types';
  import MJTXError from '@/components/publicUI/MJTXError.vue';

  const route = useRoute();
  const photoUUID = route.params.uuid as string;

  const photoData = ref<IPhoto>({ ...defaultPhoto });
  const getPhoto = () => {
    selectPhotoByID(photoUUID).then(res => {
      if (!res || !res.data) return;
      photoData.value = res.data;
    });
  };

  onMounted(() => {
    getPhoto();
  });
</script>

<template>
  <BannerBox
    type="page"
    :title="photoData.title"
    :sub-title="photoData.subtitle"
    :banner-image="photoData.index_img" />
  <div class="photo" v-if="photoData.is_public">
    <div v-for="(photo, index) in photoData.images" :key="index">
      <MJTXTextLine
        v-if="photo.title"
        :text="photo.title"
        :tip="photo.subtitle"
        size="26px"
        :description="photo.description" />
      <div class="photo-list">
        <PhotoShow
          v-for="(images, index) in photo.images"
          :key="index"
          :photo="images"
          :photo-list="photo.images"
          :is-menu="false" />
      </div>
    </div>
  </div>
  <MJTXError v-else type="notFound" text="页面未找到" />
</template>

<style scoped lang="scss">
  .photo {
    max-width: var(--max-width);
    min-height: var(--min-height);
    margin: 20px auto;

    .photo-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
