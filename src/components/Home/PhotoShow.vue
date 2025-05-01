<script setup lang="ts">
  import { defineProps, ref } from 'vue';
  import { imgToThumb } from '@/utils/imgToThumb';
  import { ElImageViewer } from 'element-plus';

  const props = defineProps({
    photo: {
      type: String,
      default: 'background.jpg',
    },
    index: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
    },
    uuid: {
      type: String,
    },
    isMenu: {
      type: Boolean,
      default: true,
    },
  });

  const coverColor = [
    '9EEB47CC',
    '5BD1D7CC',
    'F59794CC',
    'BCCEFBCC',
    'C6BEEECC',
    'D094EACC',
    'EB94CFCC',
    'F59794CC',
    'F0BF4CCC',
    'D4ED31CC',
  ];
  const index = props.index % coverColor.length;
  const pointColor = ['FFFFFF00'];
  const isPoint = ref<boolean>(false);
  const preview = ref<boolean>(false);
</script>

<template>
  <div
    class="photoTiles"
    :style="`background-image:url(${imgToThumb(props.photo, 640)})`"
    @click="!isMenu ? (preview = true) : undefined">
    <router-link :to="`photo/${props.uuid}`" v-if="isMenu">
      <div
        class="photoCover"
        :style="`background-color: #${isPoint ? pointColor : coverColor[index]}`"
        @mouseenter="isPoint = true"
        @mouseleave="isPoint = false">
        {{ props.title }}
      </div>
    </router-link>
  </div>
  <div v-if="preview" class="photoPreview">
    <el-image-viewer :url-list="[props.photo]" @close="preview = false" />
  </div>
</template>

<style scoped lang="scss">
  @media screen and (min-width: 980px) {
    .photoTiles {
      width: 30%;
    }
  }
  @media screen and (max-width: 980px) and (min-width: 480px) {
    .photoTiles {
      width: 50%;
    }
  }
  @media screen and (max-width: 480px) {
    .photoTiles {
      width: 100%;
    }
  }

  .photoTiles {
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
    background-position-y: center;
    height: 300px;
    margin: 20px;
    border-radius: var(--card-border-radius);

    &:hover {
      transform: scale(1.1);
      .photoCover {
        background-color: rgba(0, 0, 0, 0);
      }
    }
  }

  .photoCover {
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--card-border-radius);
    font-size: var(--font-size-xlarge);
    letter-spacing: 5px;
    font-weight: bold;
    cursor: pointer;
  }
</style>
