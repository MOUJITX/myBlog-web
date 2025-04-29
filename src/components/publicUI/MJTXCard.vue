<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: String,
  },
  padding: {
    type: Boolean,
  },
  minWidth: {
    type: Number,
    default: 0,
  },
  maxWidth: {
    type: Number,
    default: 0,
  },
  background: {
    type: String,
  },
  backgroundBlur: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
  },
});

const backgroundBlurFilter = 'blur(10px) contrast(50%)';
</script>

<template>
  <div
    :class="props.padding ? 'mjtx-card mjtx-card-padding' : 'mjtx-card'"
    :style="{
      'min-width': props.minWidth + 'px',
      'max-width': props.maxWidth > 0 ? props.maxWidth + 'px' : '',
      'z-index': props.zIndex,
    }"
    v-if="!props.title">
    <div
      class="mjtx-card-background"
      :style="`background-image: url('${props.background}'); filter:${props.backgroundBlur ? backgroundBlurFilter : ''}`"
      v-if="props.background"></div>
    <slot></slot>
  </div>

  <MJTXCard
    :class="props.padding ? '' : 'mjtx-card-title-box'"
    v-else
    :min-width="props.minWidth"
    :max-width="props.maxWidth"
    :background="props.background"
    :background-blur="props.backgroundBlur"
    :z-index="props.zIndex">
    <div class="mjtx-card-title">{{ props.title }}</div>
    <div :class="props.padding ? 'mjtx-card-padding' : ''">
      <slot></slot>
    </div>
  </MJTXCard>
</template>

<style scoped lang="scss">
.mjtx-card {
  overflow: visible;
  margin: var(--card-margin);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  background-color: white;
  &:hover {
    box-shadow: var(--box-shadow-hover);
  }

  position: relative;
}
.mjtx-card-padding {
  padding: var(--card-padding);
}
.mjtx-card-background {
  position: absolute;
  top: -100px;
  left: -100px;
  width: 150%;
  height: 400px;

  background-color: var(--color-lightgrey);
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
}

.mjtx-card-title-box {
  padding-bottom: var(--card-padding);
}
.mjtx-card-title {
  font-size: var(--font-size-large);
  padding: var(--card-padding) var(--card-padding);
  border-bottom: 1px solid #ccc;
  font-weight: bold;
}
</style>
