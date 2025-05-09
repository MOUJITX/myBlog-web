<script lang="ts" setup>
  import { ElNotification } from 'element-plus';
  import { Search } from '@element-plus/icons-vue';
  import { ref } from 'vue';
  import router from '@/router';
  import { isMobile } from '@/utils/isMobile';

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
      :class="isMobile() ? 'input input-mobile' : 'input input-normal'"
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

    &:hover {
      cursor: pointer;
      .input-normal {
        visibility: visible;
        width: 300px;
        padding: 0 10px;
      }
    }
  }

  .input {
    width: 0;
    visibility: hidden;
    height: 30px;
    background-color: #f1f2f3;
    border: 1px solid #acaaaa;
    border-radius: 10px;
    opacity: 0.8;
    padding: 0;
  }

  .input-mobile {
    visibility: visible;
    width: 300px;
    padding: 0 10px;
  }
</style>
