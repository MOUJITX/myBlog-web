<script setup lang="ts">
import {defineProps, PropType} from 'vue';
import { imgToThumb } from '@/utils/imgToThumb';

const props = defineProps({
  size:{
    type: Number,
    default: 48,
  },
  backgroundColor:{
    type: String,
    default: 'dodgerblue',
  },
  textColor:{
    type:String,
    default: 'white'
  },
  icon:{
    type: String,
    required: true
  },
  type:{
    type: String as PropType<'circle' | 'round' | 'square'>,
    default: 'round',
  },
  padding:{
    type:Boolean,
    default: false,
  }
})

const isText = !props.icon.startsWith('/files')

const paddingNum = props.padding ? 5 : 0;
</script>
<template>
  <div class="mjtx-icon"
       :style="{
          'width':(props.size-paddingNum*2)+'px',
          'height':(props.size-paddingNum*2)+'px',
          'background-color':props.backgroundColor,
          'color':props.textColor,
          'padding':`${paddingNum}px`,
          'border-radius': props.type === 'circle' ? '100%' : props.type === 'square' ? 0 : 'var(--card-border-radius)'}">
    <div v-if="isText" :style="{'font-size':props.size*0.5+'px'}">{{ props.icon.substring(0,1) }}</div>
    <div v-else :style="{
          'width':(props.size-paddingNum*2)+'px',
          'height':(props.size-paddingNum*2)+'px',
          'background-image': isText ? '' : `url('${imgToThumb(props.icon, 128)}')`,
          'border-radius': props.type === 'circle' ? '100%' : props.type === 'square' ? 0 : 'var(--card-border-radius)'
    }" class="mjtx-icon-img"></div>
  </div>
</template>

<style scoped lang="scss">
.mjtx-icon{
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  .mjtx-icon-img{
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;
    background-position-y: center;
  }
}
</style>
