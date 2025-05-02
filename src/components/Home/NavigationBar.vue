<script lang="ts" setup>
  import { isMobile } from '@/utils/isMobile';
  import { IWebsiteNavigation } from '@/api/types';
  import MJTXRouterLink from '@/components/publicUI/MJTXRouterLink.vue';
  import ArticleSearch from './ArticleSearch.vue';
  import { Menu } from '@element-plus/icons-vue';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const webName = localStorage.getItem('web_name');
  const isSearch = localStorage.getItem('func_search') === 'true';
  const navigations: IWebsiteNavigation[] = JSON.parse(
    localStorage.getItem('web_navigate') || '[]',
  );
  ref(false);

  const showDropMenu = ref(false);

  const route = useRoute();
  watch(
    () => route.fullPath,
    () => (showDropMenu.value = false),
  );
</script>

<template>
  <div class="nav-container" @mouseleave="showDropMenu = false">
    <div class="nav-bar">
      <div class="nav-left">
        <router-link to="/">{{ webName }}</router-link>
        <ul v-if="!isMobile()">
          <div v-for="(item, index) in navigations" :key="index">
            <li v-if="item.nav_enabled">
              <MJTXRouterLink :to="item.nav_url">
                {{ item.nav_name }}
              </MJTXRouterLink>
            </li>
          </div>
        </ul>
      </div>
      <div class="nav-right">
        <ArticleSearch v-if="!isMobile() && isSearch" />
        <Menu
          class="nav-menu"
          v-if="isMobile()"
          @mouseenter="showDropMenu = true" />
      </div>
    </div>
    <div class="nav-drop" v-if="isMobile() && showDropMenu">
      <div v-for="(item, index) in navigations" :key="index">
        <MJTXRouterLink :to="item.nav_url" v-if="item.nav_enabled">
          <div class="nav-drop-item">
            {{ item.nav_name }}
          </div>
        </MJTXRouterLink>
      </div>
      <ArticleSearch class="nav-drop-search" v-if="isSearch" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .nav-container {
    position: fixed;
    width: 100%;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(17, 24, 39, 0.1);
    box-shadow: 0 8px 16px rgba(18, 38, 63, 0.05);
    backdrop-filter: blur(8px);
    z-index: 99999;
    color: white;
    font-weight: 500;
  }
  .nav-bar {
    height: 50px;
    white-space: nowrap;
    overflow-x: auto;
    //overflow-y: hidden;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-bar::-webkit-scrollbar {
    display: none;
  }

  .nav-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .nav-right {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .nav-right div {
    margin: 0 10px;
  }

  .nav-bar ul {
    flex-direction: row;
    display: flex;
    list-style: none;
    margin-left: 10px;
  }

  .nav-bar ul li {
    padding: 0 10px;
  }

  .nav-bar ul li a {
    line-height: 50px;
  }

  .nav-bar ul li:hover {
    background-color: white;

    a {
      color: var(--color-black);
    }
  }

  .nav-menu {
    width: 25px;
    &:hover {
      cursor: pointer;
    }
  }

  .nav-drop {
    .nav-drop-item {
      line-height: 50px;
      padding: 0 20px;

      &:hover {
        background-color: white;
        color: var(--color-black);
      }
    }
    .nav-drop-search {
      padding: 10px 20px 20px 20px;
      justify-content: center;
    }
  }
</style>
