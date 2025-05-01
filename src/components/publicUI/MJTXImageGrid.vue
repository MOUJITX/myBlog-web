<script setup lang="ts">
  import {
    Delete,
    Edit,
    Link,
    Search,
    Select,
    CloseBold,
  } from '@element-plus/icons-vue';
  import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';
  import { onMounted, ref, defineModel, defineProps, defineExpose } from 'vue';
  import { IFile } from '@/api/types';
  import {
    defaultFile,
    deleteFileAPI,
    getImagesPage,
    renameFileAPI,
  } from '@/api/file';
  import { ElNotification } from 'element-plus';
  import MJTXInline from '@/components/publicUI/MJTXInline.vue';
  import { imgToThumb } from '@/utils/imgToThumb';
  import useClipboard from 'vue-clipboard3';

  const selectImages = defineModel<string[]>({ default: [] });

  const props = defineProps({
    limit: {
      type: Number,
    },
  });

  const tableData = ref<IFile[]>([]);
  const listQuery = ref({ currentPage: 1, pagesize: 18 });
  const total = ref(0);

  const searchForm = ref<IFile>({ ...defaultFile });
  const getDataList = () => {
    getImagesPage(
      listQuery.value.currentPage,
      listQuery.value.pagesize,
      searchForm.value,
    ).then(res => {
      if (!res) return;
      tableData.value = res.data.list;
      total.value = res.data.total;
    });
  };

  onMounted(() => {
    getDataList();
  });

  defineExpose({
    getDataList,
  });

  const selectFile = (download_url: string) => {
    if (props.limit && props.limit === 1) {
      selectImages.value = [download_url];
      return;
    }
    if (props.limit && selectImages.value.length >= props.limit) {
      ElNotification.warning({
        title: '图片选择失败',
        message: '最多只能选择' + props.limit + '个文件',
      });
      return;
    }
    if (selectImages.value.includes(download_url)) {
      selectImages.value.splice(selectImages.value.indexOf(download_url), 1);
    } else {
      selectImages.value.push(download_url);
    }
    console.log(selectImages.value);
  };

  const deleteSingle = (id: string) => {
    deleteFileAPI(id).then(res => {
      if (res) ElNotification.success({ title: res.data });
      getDataList();
    });
  };

  const { toClipboard } = useClipboard();
  const copyToClipboard = async (text: string) => {
    try {
      await toClipboard(location.origin + text);
      ElNotification.success({ title: '图片地址复制成功' });
    } catch (e) {
      ElNotification.error({
        title: '图片地址复制失败，当前浏览器似乎不支持复制功能',
      });
    }
  };

  const imageName = ref<string[]>([]);

  const visible = ref<boolean[]>([false]);
  const openRenamePopover = (originName: string, index: number) => {
    visible.value.forEach((item, index) => (visible.value[index] = false));
    imageName.value[index] = originName;
    visible.value[index] = true;
  };
  const renameImage = (id: string, originName: string, index: number) => {
    if (!imageName.value[index]) {
      ElNotification.warning({
        title: '重命名失败',
        message: '文件名不允许为空',
      });
      return;
    } else if (imageName.value[index].length > 255) {
      ElNotification.warning({
        title: '重命名失败',
        message: '文件名长度不允许大于255个字符',
      });
      return;
    } else if (imageName.value[index] === originName) {
      visible.value[index] = false;
      return;
    }

    renameFileAPI(id, imageName.value[index]).then(res => {
      if (res) ElNotification.success({ title: res.data });
      visible.value[index] = false;
      getDataList();
    });
  };
</script>

<template>
  <MJTXInline class="mjtx-imageGrid-search">
    <el-input v-model="searchForm.file_name" @input="getDataList"></el-input>
    <el-button @click="getDataList"
      ><el-icon><Search /></el-icon
    ></el-button>
  </MJTXInline>
  <div class="mjtx-imageGrid">
    <div
      class="mjtx-imageGrid-image"
      v-for="(image, index) in tableData"
      :key="index">
      <el-image
        fit="cover"
        class="el-upload--picture-card"
        :preview-src-list="[image.download_url]"
        :src="imgToThumb(image.download_url, 128)" />
      <span class="mjtx-imageGrid-name">{{
        image.file_name + image.end_name
      }}</span>
      <span class="mjtx-imageGrid-btn">
        <el-icon @click="copyToClipboard(image.download_url)"><Link /></el-icon>
        <el-popover
          placement="bottom-start"
          title="修改图片标题"
          trigger="click"
          width="300"
          ref="refRenamePopover"
          :visible="visible[index]">
          <MJTXInline position="center">
            <el-input v-model="imageName[index]"></el-input>
            <el-button
              type="primary"
              :icon="Select"
              circle
              size="small"
              @click="renameImage(image.uuid, image.file_name, index)" />
            <el-button
              :icon="CloseBold"
              circle
              size="small"
              @click="visible[index] = false" />
          </MJTXInline>
          <template #footer></template>
          <template #reference>
            <el-icon @click="openRenamePopover(image.file_name, index)"
              ><Edit
            /></el-icon>
          </template>
        </el-popover>
        <el-popconfirm title="确认删除？" @confirm="deleteSingle(image.uuid)">
          <template #reference>
            <el-icon color="red"><Delete /></el-icon>
          </template>
        </el-popconfirm>
      </span>
      <div
        class="mjtx-imageGrid-mask"
        v-if="selectImages.includes(image.download_url)">
        {{ selectImages.indexOf(image.download_url) + 1 }}
      </div>
      <div
        :class="`mjtx-imageGrid-select mjtx-imageGrid-select__${selectImages.includes(image.download_url) ? 'on' : 'off'}`"
        @click="selectFile(image.download_url)"></div>
    </div>
  </div>
  <MJTXPagination
    v-model:current-page="listQuery.currentPage"
    v-model:page-size="listQuery.pagesize"
    :page-sizes="[18, 36, 72]"
    :total="total"
    @handleChange="getDataList()" />
</template>

<style scoped lang="scss">
  .mjtx-imageGrid {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
  }
  .mjtx-imageGrid-search {
    width: 30%;

    .el-input {
      margin-right: 5px;
    }
  }
  .mjtx-imageGrid-image {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    margin: 5px;

    .el-image {
      width: 100px;
      height: 100px;
      margin-bottom: 8px;
    }

    .mjtx-imageGrid-name {
      font-size: 14px;
      color: var(--color-black);
      text-align: center;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mjtx-imageGrid-btn {
      font-size: 14px;
      display: none;

      .el-icon {
        padding: 0 5px;
        cursor: pointer;
      }
    }

    &:hover {
      .mjtx-imageGrid-name {
        display: none;
      }
      .mjtx-imageGrid-btn {
        display: block;
      }
    }

    .mjtx-imageGrid-mask {
      width: 100px;
      height: 100px;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.2);
      align-items: center;
      display: flex;
      justify-content: center;
      color: white;
      font-size: 40px;
      font-weight: bolder;
      border-radius: var(--card-border-radius);
    }

    .mjtx-imageGrid-select {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 7px;
      left: 7px;
      border: 1px solid #fff;
    }

    .mjtx-imageGrid-select__on {
      background-color: var(--el-color-success);
      background-image: url('../../assets/yes.svg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position-x: center;
      background-position-y: center;
    }

    .mjtx-imageGrid-select__off {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
</style>
