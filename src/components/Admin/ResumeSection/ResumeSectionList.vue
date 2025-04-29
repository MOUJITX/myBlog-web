<script setup lang="ts">
import MJTXCard from '@/components/publicUI/MJTXCard.vue';
import { ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';
import { IResumeSection } from '@/api/types';
import {
  deleteResumeSectionAPI,
  deleteResumeSectionsAPI,
  getResumeSections,
} from '@/api/resumeSection';
import ResumeSectionPopup from '@/components/Admin/ResumeSection/ResumeSectionPopup.vue';

const tableData = ref<IResumeSection[]>([]);

const getDataList = () => {
  getResumeSections().then(res => {
    if (!res) return;
    tableData.value = res.data;
  });
};

const deleteSingle = (id: string) => {
  deleteResumeSectionAPI(id).then(res => {
    if (res) ElNotification.success({ title: res.data });
    getDataList();
  });
};

const deleteBatch = () => {
  deleteResumeSectionsAPI(uuids.value).then(res => {
    if (res) ElNotification.success({ title: res.data });
    getDataList();
  });
};

const uuids = ref<string[]>([]);
const tableRowSelect = (selected: IResumeSection[]) => {
  uuids.value = selected.map((item: IResumeSection) => item.uuid);
};

onMounted(() => {
  getDataList();
  uuids.value = [];
});
</script>

<template>
  <MJTXCard padding>
    <ResumeSectionPopup @popupClose="getDataList" action="insert" />
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
      <el-table-column prop="ordernum" label="排序" />
      <el-table-column prop="enabled" label="启用" />
      <el-table-column prop="section" label="模块" />
      <el-table-column prop="create_time" label="添加时间" />
      <el-table-column prop="update_time" label="最后更新时间" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <ResumeSectionPopup
            :uuid="scope.row.uuid"
            @popupClose="getDataList"
            action="update" />
          <ResumeSectionPopup
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
  </MJTXCard>
</template>

<style scoped lang="scss"></style>
