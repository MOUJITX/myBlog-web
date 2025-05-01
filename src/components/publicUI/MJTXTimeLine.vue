<script setup lang="ts">
  import { defineProps, PropType } from 'vue';
  const props = defineProps({
    time: {
      type: String,
    },
    timeSize: {
      type: String as PropType<'small' | 'medium' | 'large'>,
    },
    event: {
      type: String,
    },
    description: {
      type: String,
    },
  });
</script>

<template>
  <div class="mjtx-timeline">
    <div
      class="mjtx-timeline-time"
      :style="{ 'font-size': `var(--font-size-${props.timeSize})` }">
      {{ props.time }}
    </div>
    <div class="mjtx-timeline-point" />
    <div class="mjtx-timeline-text">
      <slot>{{ props.event }}</slot>
      <div class="mjtx-timeline-description">{{ props.description }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .mjtx-timeline {
    display: flex;
    align-items: center;
  }
  .mjtx-timeline-time {
    padding: 0 10px;
    text-align: right;
    width: 100px;
    flex-shrink: 0;
    font-size: var(--font-size-medium);
  }
  .mjtx-timeline-point {
    width: 14px;
    height: 14px;
    border-radius: 100%;
    background-color: var(--color-black);
    z-index: 1;
    flex-shrink: 0;
  }
  .mjtx-timeline-text {
    padding: 10px 10px 10px 17px;
    border-left: 1px solid gray;
    position: relative;
    left: -7px;
    font-size: var(--font-size-large);
    font-weight: 700;

    .mjtx-timeline-description {
      font-size: var(--font-size-medium);
      font-weight: normal;
      color: gray;
      margin-top: 10px;
    }
  }
</style>
