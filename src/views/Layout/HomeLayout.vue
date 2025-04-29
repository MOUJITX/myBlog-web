<script setup lang="ts">
import NavigationBar from '@/components/Home/NavigationBar.vue';
import BlogFooter from '@/components/Home/BlogFooter.vue';
import { getWebsiteSetting } from '@/api/websiteSetting';
import { onMounted, ref } from 'vue';
import WebNotice from '@/components/Home/WebNotice.vue';
import WebLoading from '@/components/Home/WebLoading.vue';

onMounted(() => {
  getWebsiteSetting().then(res => {
    if (!res) return;
    Object.keys(res.data).forEach(key => {
      if (key === 'func_enabled') isEnabled.value = res.data[key].value;
      if (key === 'web_navigate' || key === 'profile_concat')
        localStorage.setItem(key, JSON.stringify(res.data[key].value));
      else localStorage.setItem(key, res.data[key].value);
    });
    isLoading.value = false;
  });
});

const isLoading = ref<boolean>(true);
const isEnabled = ref<boolean>(true);
</script>

<template>
  <WebLoading v-if="isLoading" />
  <WebNotice v-else-if="!isEnabled" />
  <div v-else>
    <NavigationBar />
    <router-view />
    <BlogFooter />
  </div>
</template>

<style lang="scss">
.nb-spinner {
  width: 75px;
  height: 75px;
  margin: 0;
  background: transparent;
  border-top: 4px solid #009688;
  border-right: 4px solid transparent;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
