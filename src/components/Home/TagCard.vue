<script setup lang="ts">
import MJTXCard from '@/components/publicUI/MJTXCard.vue';
import MJTXTag from '@/components/publicUI/MJTXTag.vue';
import { onMounted, ref } from 'vue';
import { ITag } from '@/api/types';
import { getTags } from '@/api/tag';

const tags = ref<ITag[]>([]);

onMounted(() => {
  getTags().then(res => {
    if (!res) return;
    tags.value = res.data;
  });
});
</script>

<template>
  <MJTXCard class="tag-card" title="标签 Tags" padding>
    <div class="tags">
      <router-link
        :to="`/list/tag/${item.uuid}`"
        v-for="(item, index) in tags"
        :key="index">
        <MJTXTag class="tag">
          <div>
            {{ item.tag }}<sup>{{ item.tag_count }}</sup>
          </div>
        </MJTXTag>
      </router-link>
      <!--      <router-link to="/list/category/category">-->
      <!--        <MJTXTag>-->
      <!--          <div>Java</div>-->
      <!--          <div class="tag-count">223</div>-->
      <!--        </MJTXTag>-->
      <!--      </router-link>-->
    </div>
  </MJTXCard>
</template>

<style scoped lang="scss">
.tag-card {
  margin-top: 20px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .tag:before {
    content: '#';
    margin-right: 3px;
    color: gray;
  }

  sup {
    color: gray;
    padding-left: 4px;
  }

  .tag-count {
    padding: 2px;
    background: var(--color-black);
    border-radius: 4px;
    text-align: center;
    color: white;
    margin-left: 4px;
    font-size: var(--font-size-small);
  }
}
</style>
