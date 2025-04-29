<script setup lang="ts">
import InfoCard from '@/components/Home/InfoCard.vue';
</script>

<template>
  <div class="admin-index-container">
    <InfoCard icon="📝" title="32" sub-title="文章" :min-width="200" />
    <InfoCard icon="🏷️" title="24" sub-title="标签" :min-width="200" />
    <InfoCard icon="📒" title="17" sub-title="栏目" :min-width="200" />
    <InfoCard icon="⏰" title="17" sub-title="运行" :min-width="200" />
  </div>
</template>

<style scoped lang="scss">
.admin-index-container {
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
}
</style>
