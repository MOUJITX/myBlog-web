<script setup>
  import BannerBox from '@/components/Home/BannerBox.vue';
  import MJTXCard from '@/components/publicUI/MJTXCard.vue';
  import MJTXTextLine from '@/components/publicUI/MJTXTextLine.vue';
</script>

<template>
  <BannerBox title="Test Page" type="page" />
  <div>
    <MJTXCard padding>
      <MJTXTextLine text="Network IP" size="25px" />
      <div></div>
    </MJTXCard>
  </div>
</template>

<style scoped lang="scss"></style>
