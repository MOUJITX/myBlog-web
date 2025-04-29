<script setup lang="ts">
import { defineProps, PropType } from 'vue';
const props = defineProps({
  position: {
    type: String as PropType<
      'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
    >,
    default: 'flex-end',
  },
});
</script>

<template>
  <div class="mjtx-inline" :style="{ 'align-items': props.position }">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.mjtx-inline {
  display: flex;
}
</style>
