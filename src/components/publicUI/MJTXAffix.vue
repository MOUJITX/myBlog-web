<script setup lang="ts">
  import { useElementBounding } from '@vueuse/core';
  import {
    computed,
    CSSProperties,
    onMounted,
    ref,
    shallowRef,
    watchEffect,
    defineProps,
  } from 'vue';
  // 目标元素
  const root = shallowRef<HTMLElement>();
  const fixed = ref(false);
  // 目标元素信息
  const {
    height: rootHeight,
    width: rootWidth,
    top: rootTop,
    // bottom: rootBottom,
    update: updateRoot,
  } = useElementBounding(root);
  // 滚动容器
  const scrollContainer = shallowRef<HTMLElement | Window>();

  const props = defineProps({
    offset: {
      type: Number,
      default: 0,
    },
  });

  onMounted(() => {
    // 我们先以window作为滚动容器
    scrollContainer.value = window;
    // 更新root的信息
    updateRoot();
  });

  const update = () => {
    if (!scrollContainer.value) return;
    // 这里可以看到，我们根据当目标元素root的位置信息top < 0 判断是否将离开窗口而进行fixed
    fixed.value = props.offset >= rootTop.value;
  };
  watchEffect(update);

  const rootStyle = computed<CSSProperties>(() => {
    return {
      width: fixed.value ? `${rootWidth.value}px` : '',
      height: fixed.value ? `${rootHeight.value}px` : '',
    };
  });
  const affixStyle = computed<CSSProperties>(() => {
    if (!fixed.value) return {};
    return {
      width: `${rootWidth.value}px`,
      height: `${rootHeight.value}px`,
      top: `${props.offset}px`,
    };
  });
</script>

<template>
  <div class="affix" ref="root" :style="rootStyle">
    <div class="affix-content" :class="{ fixed }" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .fixed {
    position: fixed;
  }
</style>
