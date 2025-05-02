<script setup lang="ts">
  import Prism from 'prismjs';
  import 'prismjs/themes/prism-tomorrow.css';
  import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
  import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
  import 'prismjs/plugins/toolbar/prism-toolbar.css';
  import 'prismjs/plugins/toolbar/prism-toolbar.js';
  import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';
  import 'prismjs/plugins/autolinker/prism-autolinker.js';
  import 'prismjs/plugins/autolinker/prism-autolinker.css';
  import 'prismjs/plugins/show-language/prism-show-language.js';
  import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
  import 'prismjs/plugins/match-braces/prism-match-braces.css';
  import 'prismjs/plugins/match-braces/prism-match-braces.js';

  import MJTXCard from '@/components/publicUI/MJTXCard.vue';
  import { defineProps, nextTick, onMounted, ref } from 'vue';
  import { ElImageViewer } from 'element-plus';
  import { htmlToImgList } from '@/utils/htmlToImgList';
  const props = defineProps({
    html: {
      type: String,
    },
  });

  const imgShow = ref<boolean>(false);
  const imgSrcIndex = ref<number>(0);
  const imgSrcList = ref<string[]>([]);

  onMounted(async () => {
    await nextTick();
    Prism.highlightAll();

    imgSrcList.value = htmlToImgList(props.html);
  });

  const handleArticleClick = (e: any) => {
    if (e.target.nodeName === 'IMG') {
      const imgSrc = e.target.src;
      imgSrcIndex.value = imgSrcList.value.findIndex(
        item =>
          item.substring(item.lastIndexOf('/')) ===
          imgSrc.substring(imgSrc.lastIndexOf('/')),
      );
      imgShow.value = true;
    }
  };
</script>

<template>
  <MJTXCard class="article-content" padding>
    <article
      v-html="props.html"
      @click="handleArticleClick"
      class="line-numbers toolbar match-braces"
      lang="zh-Hans-CN"
      data-prismjs-copy="复制文本"
      data-prismjs-copy-error="按Ctrl+C复制"
      data-prismjs-copy-success="文本已复制！"></article>
  </MJTXCard>
  <el-image-viewer
    :url-list="imgSrcList"
    :initialIndex="imgSrcIndex"
    v-if="imgShow"
    @close="imgShow = false" />
</template>

<style scoped lang="scss">
  .article-content {
    text-align: justify;
    min-height: 400px;
    word-break: break-all;
  }
</style>
