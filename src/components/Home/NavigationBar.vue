<script lang="ts" setup>
  import { isMobile } from '@/utils/isMobile';
  import { IWebsiteNavigation } from '@/api/types';
  import MJTXRouterLink from '@/components/publicUI/MJTXRouterLink.vue';
  import ArticleSearch from './ArticleSearch.vue';

  const webName = localStorage.getItem('web_name');
  const isSearch = localStorage.getItem('func_search') === 'true';
  const navigations: IWebsiteNavigation[] = JSON.parse(
    localStorage.getItem('web_navigate') || '[]',
  );
</script>

<template>
  <div class="nav-bar">
    <div class="nav-left">
      <router-link to="/">{{ webName }}</router-link>
      <ul v-if="!isMobile()">
        <div v-for="(item, index) in navigations" :key="index">
          <li v-if="item.nav_enabled">
            <MJTXRouterLink :to="item.nav_url">{{
              item.nav_name
            }}</MJTXRouterLink>
          </li>
        </div>
      </ul>
    </div>
    <div class="nav-right">
      <ArticleSearch v-if="!isMobile() && isSearch" />
      <div v-if="isMobile()">menu</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .nav-bar {
    position: fixed;

    width: 100%;
    height: 50px;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(17, 24, 39, 0.1);
    box-shadow: 0 8px 16px rgba(18, 38, 63, 0.05);
    backdrop-filter: blur(8px);
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    z-index: 99999;
    color: white;
    font-weight: 500;

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
</style>
