<script setup lang="ts">
  import MJTXFormButton from '@/components/publicUI/MJTXFormButton.vue';
  import { defineEmits, ref } from 'vue';
  import ResumeSectionList from '@/components/Admin/ResumeSection/ResumeSectionList.vue';
  import { isMobile } from '@/utils/isMobile';

  const emit = defineEmits(['popup-close']);

  const popupVisible = ref(false);
  const handleClose = () => {
    popupVisible.value = false;
    console.log('close');
    emit('popup-close');
  };
</script>

<template>
  <MJTXFormButton
    type="primary"
    form="drawer"
    button-title="模块设置"
    form-title="模块设置"
    :size="isMobile() ? '100%' : '60%'"
    v-model="popupVisible"
    @popupClose="handleClose">
    <ResumeSectionList />
  </MJTXFormButton>
</template>

<style scoped lang="scss"></style>
