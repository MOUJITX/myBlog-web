<script setup lang="ts">
import { isMobile } from '@/utils/isMobile';
import { defineProps, defineModel, defineEmits, PropType } from 'vue';
const props = defineProps({
  total: Number,
  layout: {
    type: String,
    default: isMobile()
      ? 'total, prev, next'
      : 'total, sizes, prev, pager, next',
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50];
    },
  },
  background: {
    type: Boolean,
    default: true,
  },
  hideOnSinglePage: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'right',
  },
});

const currentPage = defineModel('currentPage');
const pageSize = defineModel('pageSize');

const emit = defineEmits(['handleChange']);

const handleSizeChange = (val: number) => {
  emit('handleChange', { pageSize: val, currentPage: currentPage.value });
};
const handleCurrentChange = (val: number) => {
  emit('handleChange', { pageSize: pageSize.value, currentPage: val });
};
</script>

<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="props.pageSizes"
    :layout="props.layout"
    :total="props.total"
    :background="props.background"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :style="`justify-content:${props.position}`" />
</template>

<style scoped lang="scss">
.el-pagination {
  margin-top: 20px;
}
</style>
