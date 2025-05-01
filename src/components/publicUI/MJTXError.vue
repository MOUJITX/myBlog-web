<script setup lang="ts">
  import { defineProps, PropType } from 'vue';
  import ArticleSearch from '@/components/Home/ArticleSearch.vue';

  const props = defineProps({
    type: {
      type: String as PropType<'empty' | 'notFound'>,
    },
    text: {
      type: String,
    },
    showSearch: {
      type: Boolean,
    },
  });
</script>

<template>
  <div class="mjtx-error">
    <div :class="`mjtx-error-svg mjtx-error-${props.type}`"></div>
    <div class="mjtx-error-text">
      <div>{{ props.text }}</div>
      <ArticleSearch v-if="props.showSearch" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .mjtx-error {
    max-width: var(--max-width);
    min-height: var(--min-height);
    margin: 20px auto;
  }

  .mjtx-error-svg {
    width: 100%;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .mjtx-error-empty {
    background-image: url('../../assets/empty.svg');
  }
  .mjtx-error-notFound {
    background-image: url('../../assets/404.svg');
  }

  .mjtx-error-text {
    display: flex;
    font-size: 20px;
    color: #999;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
</style>
