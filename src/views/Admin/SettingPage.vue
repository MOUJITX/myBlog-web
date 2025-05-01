<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { IWebsiteSetting } from '@/api/types';
  import { getWebsiteSettingAdmin, updateWebsite } from '@/api/websiteSetting';
  import MJTXImageUpload from '@/components/publicUI/MJTXImageUpload.vue';
  import { ElNotification } from 'element-plus';
  import SettingNavigation from '@/components/Admin/Setting/SettingNavigation.vue';
  import SettingConcat from '@/components/Admin/Setting/SettingConcat.vue';
  import MJTXTinymceEditor from '@/components/publicUI/MJTXTinymceEditor.vue';

  const websiteSettings = ref<IWebsiteSetting[]>([]);

  onMounted(() => {
    getSettings();
  });

  const getSettings = () => {
    getWebsiteSettingAdmin().then(res => {
      if (!res) return;
      websiteSettings.value = res.data;
    });
  };

  const tabLabel = ['基础设置', '网站导航', '功能开关', '个人信息'];
  const tabName = ref<string>(tabLabel[0]);
  const tabChange = (index: number) => {
    tabName.value = tabLabel[index];
  };

  const updateSetting = (item: IWebsiteSetting) => {
    updateWebsite(item).then(res => {
      if (!res) return;
      ElNotification.success({ title: '更新成功' });
    });
  };
</script>
<template>
  <div class="setting-title">{{ tabName }}</div>
  <el-form label-position="top" label-width="100px">
    <el-tabs type="border-card" @tab-change="tabChange">
      <el-tab-pane label="基础设置">
        <div v-for="(item, index) in websiteSettings" :key="index">
          <el-form-item
            v-if="item.name.startsWith('web_') && item.name !== 'web_navigate'"
            :label="item.label"
            :prop="item.name">
            <MJTXImageUpload
              v-if="item.name === 'web_icon'"
              v-model="item.value.value"
              is-picker
              @change="updateSetting(item)" />
            <MJTXImageUpload
              v-else-if="item.name === 'web_banner'"
              v-model="item.value.value"
              is-picker
              multiple
              :limit="5"
              @change="updateSetting(item)" />
            <el-input
              v-else
              v-model="item.value.value"
              @change="updateSetting(item)"></el-input>
          </el-form-item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="网站导航">
        <div v-for="(item, index) in websiteSettings" :key="index">
          <SettingNavigation
            v-if="item.name === 'web_navigate'"
            v-model="item.value.value"
            @change="updateSetting(item)" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="功能开关">
        <div v-for="(item, index) in websiteSettings" :key="index">
          <el-form-item
            v-if="item.name.startsWith('func_')"
            :label="item.label"
            :prop="item.name">
            <MJTXTinymceEditor
              v-if="item.name === 'func_notice'"
              v-model="item.value.value"
              :height="400"
              size="mini"
              @change="updateSetting(item)" />
            <el-switch
              v-else
              v-model="item.value.value"
              @change="updateSetting(item)" />
          </el-form-item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人信息">
        <div v-for="(item, index) in websiteSettings" :key="index">
          <el-form-item
            v-if="item.name.startsWith('profile_')"
            :label="item.label"
            :prop="item.name">
            <SettingConcat
              v-if="item.name === 'profile_concat'"
              v-model="item.value.value"
              @change="updateSetting(item)" />
            <MJTXImageUpload
              v-else-if="item.name === 'profile_avatar'"
              v-model="item.value.value"
              is-picker
              @change="updateSetting(item)" />
            <MJTXImageUpload
              v-else-if="item.name === 'profile_background'"
              v-model="item.value.value"
              is-picker
              @change="updateSetting(item)" />
            <el-input
              v-else
              v-model="item.value.value"
              @change="updateSetting(item)"></el-input>
          </el-form-item>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>
<style scoped>
  .setting-title {
    font-size: 25px;
    font-weight: bold;
    margin: 10px 0;
  }
</style>
