<script lang="ts" setup>
  import { ElNotification } from 'element-plus';
  import { Search } from '@element-plus/icons-vue';
  import { ref } from 'vue';
  import router from '@/router';

  const searchInput = ref('');

  const handleSearch = () => {
    if (searchInput.value) {
      router.push(`/search/${searchInput.value}`);
    } else {
      ElNotification.error({ title: '请输入搜索内容', zIndex: 100000 });
      return;
    }
  };
</script>

<template>
  <div class="nav-search">
    <input
      placeholder="Search something..."
      v-model="searchInput"
      @keyup.enter="handleSearch" />
    <Search @Click="handleSearch" />
  </div>
</template>

<style lang="scss" scoped>
  .nav-search {
    // width: 200px;
    display: flex;

    svg {
      width: 25px;
      padding-left: 5px;
    }

    input {
      width: 0;
      visibility: hidden;
      height: 30px;
      background-color: #f1f2f3;
      border: 1px solid #e3e5e7;
      border-radius: 10px;
      opacity: 0.8;
      padding: 0;
    }

    &:hover {
      cursor: pointer;
      input {
        visibility: visible;
        width: 300px;
        padding: 0 10px;
      }
    }
  }
</style>
