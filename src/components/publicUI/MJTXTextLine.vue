<script setup lang="ts">
import { defineProps } from 'vue';
import MJTXInline from "@/components/publicUI/MJTXInline.vue";
const props = defineProps({
  text:{
    type: String,
    required: true
  },
  tip:{
    type: String,
  },
  size:{
    type: String,
  },
  description:{
    type: String,
  }
})
</script>

<template>
  <MJTXInline position="baseline">
    <div class="mjtx-textLine-text" :style="{'font-size':props.size}">
      {{ props.text }}
    </div>
    <div class="mjtx-textLine-tip">{{props.tip}}</div>
  </MJTXInline>
  <div class="mjtx-textLine-description">{{props.description}}</div>
</template>

<style scoped lang="scss">
.mjtx-textLine-text{
  font-size: var(--font-size-medium);
  font-weight: bold;
  font-family: "Heiti SC",serif;
  color: var(--color-black);
  position: relative;
  z-index: 1;
  margin: 10px;

  &:after{
    content: "";
    width: 2em;
    height: 5px;
    border-radius: 190px;
    background: rgba(67, 207, 124, 1);
    position: absolute;
    left: 0;
    bottom: 2px;
    z-index: -1;
  }
}
.mjtx-textLine-tip{
  color: var(--color-lightgrey);
}

.mjtx-textLine-description{
  color: var(--color-lightgrey);
  margin: 10px;
}
</style>
