<script lang="ts" setup>
import { Expand, Fold, Setting } from '@element-plus/icons-vue';
import { ref } from 'vue';
import router from '@/router';
import { isMobile } from '@/utils/isMobile';
import { onMounted } from 'vue';
const isCollapse = ref(isMobile());
const asideWidth = ['180px', '64px'];
const logoText = ['MOUJITX', 'M'];
const toolbarText = '网站后台';

const nickname = localStorage.getItem('nickname');
const token = localStorage.getItem('token');

const logout = () => {
  localStorage.clear();
  router.push('/admin/login');
};

onMounted(() => {
  if (!token) {
    router.push('/admin/login');
  }
});
</script>

<template>
  <el-container class="admin-layout-container">
    <el-aside
      :width="asideWidth[isCollapse ? 1 : 0]"
      class="admin-layout-aside">
      <div class="admin-layout-aside-logo">
        <!--          <img src="@/assets/logo.png" alt="logo" />-->
        <span>{{ logoText[isCollapse ? 1 : 0] }}</span>
      </div>
      <el-scrollbar>
        <el-menu :default-active="$route.path" router :collapse="isCollapse">
          <el-menu-item index="/admin/index">
            <el-icon><Setting /></el-icon>
            <template #title>工作台</template>
          </el-menu-item>
          <el-menu-item index="/admin/article">
            <el-icon><Setting /></el-icon>
            <template #title>文章</template>
          </el-menu-item>
          <el-menu-item index="/admin/category">
            <el-icon><Setting /></el-icon>
            <template #title>栏目</template>
          </el-menu-item>
          <el-menu-item index="/admin/tag"
            ><el-icon> <Setting /></el-icon>
            <template #title>标签</template>
          </el-menu-item>
          <el-menu-item index="/admin/resume"
            ><el-icon> <Setting /></el-icon>
            <template #title>简历</template>
          </el-menu-item>
          <el-menu-item index="/admin/photo"
            ><el-icon> <Setting /></el-icon>
            <template #title>25号底片</template>
          </el-menu-item>
          <el-menu-item index="/admin/file">
            <el-icon><Setting /></el-icon>
            <template #title>文件</template>
          </el-menu-item>
          <el-menu-item index="/admin/image">
            <el-icon><Setting /></el-icon>
            <template #title>图片</template>
          </el-menu-item>
          <el-menu-item index="/admin/setting">
            <el-icon><Setting /></el-icon>
            <template #title>设置</template>
          </el-menu-item>
          <el-menu-item index="/admin/ui">
            <el-icon><Setting /></el-icon>
            <template #title>UI组件</template>
          </el-menu-item>
          <el-menu-item index="/">
            <el-icon><Setting /></el-icon>
            <template #title>页面</template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header class="admin-layout-toolbar">
        <div class="admin-layout-toolbar-dropdown">
          <el-icon v-if="!isCollapse" @click="isCollapse = !isCollapse"
            ><Fold
          /></el-icon>
          <el-icon v-if="isCollapse" @click="isCollapse = !isCollapse"
            ><Expand
          /></el-icon>
          <div>{{ toolbarText }}</div>
        </div>
        <el-dropdown>
          <div class="admin-layout-toolbar-dropdown">
            <el-icon><setting /></el-icon>
            <div>{{ nickname }}</div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item style="color: red" @click="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main class="admin-layout-main">
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.admin-layout-container {
  height: 100vh;
}
.admin-layout-aside {
  background-color: var(--admin-navbar-menu-background);

  .admin-layout-aside-logo {
    height: 60px;
    background-color: var(--admin-navbar-logo-background);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 50px;
    }
    span {
      font-size: var(--font-size-large);
      color: var(--admin-navbar-text-color);
    }
  }
  .el-scrollbar {
    height: calc(100% - 60px);
  }
}

.admin-layout-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  box-shadow: var(--box-shadow);
  .admin-layout-toolbar-dropdown {
    font-size: var(--font-size-medium);
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      margin-left: 5px;
    }
  }
}
.admin-layout-main {
  padding: 0;
  .el-scrollbar {
    padding: 10px;
    height: calc(100% - 20px);
  }
}

.el-menu {
  border: 0;
}
.el-menu-item {
  background-color: var(--admin-navbar-menu-background);
  color: var(--admin-navbar-text-color);
  &:hover {
    background-color: var(--admin-navbar-menu-background-hover);
  }
}
.el-menu-item.is-active {
  background-color: var(--admin-navbar-menu-background-hover);
  color: var(--admin-navbar-text-color-hover);
}
</style>
