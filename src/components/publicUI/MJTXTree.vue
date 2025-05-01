<script setup lang="ts">
  import MJTXTree from '@/components/publicUI/MJTXTree.vue';
  import { defineProps } from 'vue';
  const props = defineProps({
    tree: Object,
    deep: {
      type: Number,
      default: 0,
    },
    gotoPath: {
      type: String,
    },
  });
</script>

<template>
  <div v-for="(item, index) in props.tree" :key="index" class="mjtx-tree">
    <router-link :to="props.gotoPath + item.uuid">
      <li>
        <div>
          <span
            class="tree-before"
            v-for="count in props.deep + 1"
            :key="count"></span>
          <span class="tree-text">
            {{ item.category }}
            <!--          <MJTXTag tag="12" :size="'12px'" :round="false"/>-->
          </span>
        </div>
      </li>
    </router-link>
    <MJTXTree
      :tree="item.children"
      :deep="props.deep + 1"
      :goto-path="props.gotoPath" />
  </div>
</template>

<style scoped lang="scss">
  .mjtx-tree {
    li {
      list-style: none;
      line-height: 2;
      cursor: pointer;
      font-size: 15px;
      text-align: justify;
      color: var(--color-black);
      padding: 0 20px;
      margin: 5px 0;
      div {
        display: flex;
        border-left: 1px dashed #ccccd8;
        .tree-before:before {
          content: '--';
          color: #ccccd8;
        }
        .tree-text {
          display: flex;
          justify-content: space-between;
        }
      }
      &:hover {
        color: var(--el-color-primary);
        background-color: var(--color-whitegray);
      }
    }
  }
</style>
