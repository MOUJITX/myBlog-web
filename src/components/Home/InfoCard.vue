<script setup lang="ts">
import {defineProps, PropType} from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  isopen:{
    type: Boolean,
    default: false
  },
  direction:{
    type: String as PropType<'row' | 'column'>,
    default: 'row'
  },
  iconSize:{
    type: Number,
  },
  iconBackground:{
    type: String,
  },
  iconColor:{
    type: String,
  },
  icon:{
    type: String,
  },
  iconType:{
    type: String as PropType<'circle' | 'round' | 'square'>,
  },
  iconPadding:{
    type: Boolean,
  },
  minWidth:{
    type: Number,
  },
  maxWidth:{
    type: Number,
  }
})
import MJTXCard from "@/components/publicUI/MJTXCard.vue";
import MJTXIcon from "@/components/publicUI/MJTXIcon.vue";
import htmlToText from "@/utils/htmlToText";

</script>

<template>
  <MJTXCard class="info-card" :min-width="props.minWidth" :max-width="props.maxWidth">
    <div :class="`info-card-top ${props.direction === 'column' ? 'info-card-column' : ''}`">
      <MJTXIcon v-if="props.icon"
                :size="props.iconSize"
                :backgroundColor="props.iconBackground"
                :text-color="props.iconColor"
                :icon="props.icon"
                :type="props.iconType"
                :padding="props.iconPadding"/>
      <div class="info-card-info">
        <h3>{{ props.title }}</h3>
        <span v-if="props.subTitle">{{ props.subTitle }}</span>
      </div>
    </div>
    <article :class="`info-card-bottom${props.isopen ? '__open' : ''}`" v-if="$slots.default"><slot></slot></article>
    <article :class="`info-card-bottom${props.isopen ? '__open' : ''}`" v-else-if="htmlToText(props.description!)" v-html="props.description"></article>
  </MJTXCard>
</template>

<style scoped lang="scss">
.info-card{
  padding: 10px;
  color: gray;

  &:hover{
    .info-card-bottom{
      padding: 5px 10px;
      max-height: 1000px;
    }
  }
}
.info-card-top{
  display: flex;
  align-items: center;
  h3{
    color: var(--color-black);
  }
  span{
    margin-right: 10px;
  }
  .mjtx-icon{
    margin: 10px;
  }
}
.info-card-bottom{
  text-align: justify;

  padding: 0 10px;
  max-height: 0;
  overflow: hidden;
}
.info-card-bottom__open{
  text-align: justify;

  padding: 5px 10px;
}
.info-card-column{
  flex-direction: column;
  .info-card-info{
    text-align: center;
  }
  h3{
    margin: 0 10px;
  }
  span{
    margin: 0;
  }
}
</style>
