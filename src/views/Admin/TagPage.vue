<script setup lang="ts">
import MJTXCard from '@/components/publicUI/MJTXCard.vue';
import { onMounted, ref } from 'vue';
import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';
import { ITag } from '@/api/types';
import { deleteTagsAPI, deleteTagAPI, getTagsPage } from '@/api/tag';
import { QuestionFilled } from '@element-plus/icons-vue';
import TagPopup from '@/components/Admin/Tag/TagPopup.vue';
import { ElNotification } from 'element-plus';
import MJTXImageUpload from '@/components/publicUI/MJTXImageUpload.vue';

const tableData = ref<ITag[]>([]);
const listQuery = ref({ currentPage: 1, pagesize: 10 });
const total = ref(10);

const getDataList = () => {
  getTagsPage(listQuery.value.currentPage, listQuery.value.pagesize).then(
    res => {
      if (!res) return;
      tableData.value = res.data.list;
      total.value = res.data.total;
    },
  );
};

const deleteSingle = (id: string) => {
  deleteTagAPI(id).then(res => {
    if (res) ElNotification.success({ title: res.data });
    getDataList();
  });
};

const deleteBatch = () => {
  deleteTagsAPI(uuids.value).then(res => {
    if (res) ElNotification.success({ title: res.data });
    getDataList();
  });
};

const uuids = ref<string[]>([]);
const tableRowSelect = (selected: ITag[]) => {
  uuids.value = selected.map((item: ITag) => item.uuid);
};

onMounted(() => {
  getDataList();
  uuids.value = [];
});
</script>

<template>
  <MJTXCard padding>
    <TagPopup @popupClose="getDataList" action="insert" />
    <el-popconfirm title="确认删除？" @confirm="deleteBatch">
      <template #reference>
        <el-button type="danger" :disabled="uuids.length === 0"
          >删除选中</el-button
        >
      </template>
    </el-popconfirm>
  </MJTXCard>
  <MJTXCard padding>
    <el-table
      ref="tableRef"
      :data="tableData"
      style="width: 100%"
      max-height="calc(100vh - 280px)"
      @selectionChange="tableRowSelect">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="tag" label="标签">
        <template #default="scope">
          <el-tooltip
            :content="scope.row.description"
            v-if="scope.row.description">
            <div>
              <span>{{ scope.row.tag }}</span>
              <el-icon><QuestionFilled /></el-icon>
            </div>
          </el-tooltip>
          <span v-else>{{ scope.row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="banner_image" label="配图">
        <template #default="scope">
          <MJTXImageUpload
            v-model="scope.row.banner_image"
            disabled
            v-if="scope.row.banner_image" />
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="添加时间" />
      <el-table-column prop="update_time" label="最后更新时间" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <TagPopup
            :uuid="scope.row.uuid"
            @popupClose="getDataList"
            action="update" />
          <TagPopup
            :uuid="scope.row.uuid"
            @popupClose="getDataList"
            action="copy" />
          <el-popconfirm
            title="确认删除？"
            @confirm="deleteSingle(scope.row.uuid)">
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <MJTXPagination
      v-model:current-page="listQuery.currentPage"
      v-model:page-size="listQuery.pagesize"
      :total="total"
      @handleChange="getDataList()" />
  </MJTXCard>
</template>

<style scoped lang="scss"></style>
