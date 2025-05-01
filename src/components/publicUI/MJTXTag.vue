<script setup lang="ts">
  import { defineProps, PropType } from 'vue';
  const props = defineProps({
    tag: {
      type: String,
    },
    size: {
      type: String,
      default: 'var(--font-size-medium)',
    },
    round: {
      type: Boolean,
      default: true,
    },
    before: {
      type: Boolean,
    },
    theme: {
      type: String as PropType<'light' | 'dark' | 'none'>,
      default: 'light',
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <div
    :class="
      props.before
        ? `mjtx-tag_${props.theme} mjtx-tag_before`
        : `mjtx-tag_${props.theme}`
    "
    :style="{
      'font-size': props.size,
      'border-radius': props.round ? '15px' : '0px',
      'text-shadow': props.shadow ? 'var(--text-shadow)' : '',
    }">
    <slot>{{ props.tag }}</slot>
  </div>
</template>

<style scoped lang="scss">
  .mjtx-tag_light {
    width: fit-content;
    background-color: var(--color-whitegray);
    color: var(--color-black);
    padding: 3px 6px;
    margin: 2px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: var(--color-black);
      color: white;
      cursor: pointer;

      //opacity: 0.5;
    }
  }

  .mjtx-tag_none {
    width: fit-content;
    color: white;
    padding: 3px 6px;
    margin: 2px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: var(--color-black);
      color: white;
      cursor: pointer;

      //opacity: 0.5;
    }
  }

  .mjtx-tag_before {
    &:before {
      content: '#';
      margin-right: 3px;
      opacity: 0.6;
    }
  }
</style>
