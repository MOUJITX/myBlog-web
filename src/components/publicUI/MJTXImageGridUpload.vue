<script setup lang="ts">
import { ref, defineModel, defineProps } from 'vue';
import MJTXImageGrid from '@/components/publicUI/MJTXImageGrid.vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { ResponseAPI } from '@/api/types';
import { ElNotification, TabsPaneContext } from 'element-plus';
import MJTXFormButton from '@/components/publicUI/MJTXFormButton.vue';

const imagesList = defineModel<string[]>({ default: [] });
const token = localStorage.getItem('token');

const props = defineProps({
  showBtn: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
  },
});
const filesUploadSuccess = (res: ResponseAPI) => {
  if (res.code === 200) {
    ElNotification.success({ title: `图片[${res.data.name}]上传成功` });
    imagesList.value.push(res.data.url);
  }
};

const MJTXImageGridRef = ref();

const tabsName = 'select';
const handleClick = (tab: TabsPaneContext) => {
  if (tab.paneName === 'select') {
    MJTXImageGridRef.value.getDataList();
  }
};

const uploadDialogShow = ref<boolean>(false);
</script>

<template>
  <el-tabs
    tab-position="left"
    v-model="tabsName"
    @tab-click="handleClick"
    v-if="!showBtn">
    <el-tab-pane label="上传图片" name="upload">
      <el-upload
        class="upload-demo"
        drag
        :action="`/api/files/upload/image?token=${token}`"
        accept="image/*"
        multiple
        :on-success="filesUploadSuccess">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将图片拖入框中或<em>点击此处上传</em></div>
      </el-upload>
    </el-tab-pane>
    <el-tab-pane label="选择图片" name="select">
      <MJTXImageGrid
        v-model="imagesList"
        ref="MJTXImageGridRef"
        :limit="props.limit" />
    </el-tab-pane>
  </el-tabs>
  <MJTXFormButton
    form="dialog"
    v-if="showBtn"
    button-title="选择图片"
    form-title="选择图片"
    type="primary"
    v-model="uploadDialogShow">
    <template #default>
      <MJTXImageGridUpload v-model="imagesList" :limit="props.limit" />
    </template>
    <template #footer>
      <span>已选中{{ imagesList.length }}张 </span>
      <el-button type="primary" @click="uploadDialogShow = false"
        >确认</el-button
      >
      <el-button type="danger" @click="imagesList = []">清除</el-button>
    </template>
  </MJTXFormButton>
</template>

<style scoped lang="scss"></style>
