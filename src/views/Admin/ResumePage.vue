<script setup lang="ts">
import MJTXCard from '@/components/publicUI/MJTXCard.vue';
import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';
import { ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';
import { IResume, IResumeSection, IValueAndText } from '@/api/types';
import {
  defaultResume,
  deleteResumeAPI,
  deleteResumesAPI,
  getResumesPage,
} from '@/api/resume';
import ResumePopup from '@/components/Admin/Resume/ResumePopup.vue';
import ResumeSectionListPopup from '@/components/Admin/ResumeSection/ResumeSectionListPopup.vue';
import { getResumeSections } from '@/api/resumeSection';

const tableData = ref<IResume[]>([]);
const listQuery = ref({ currentPage: 1, pagesize: 10 });
const total = ref(10);
const searchForm = ref<IResume>({ ...defaultResume });

const getDataList = () => {
  getResumesPage(
    listQuery.value.currentPage,
    listQuery.value.pagesize,
    searchForm.value,
  ).then(res => {
    if (!res) return;
    tableData.value = res.data.list;
    total.value = res.data.total;
  });
};

const deleteSingle = (id: string) => {
  deleteResumeAPI(id).then(res => {
    if (res) ElNotification.success({ title: res.data });
    getDataList();
  });
};

const deleteBatch = () => {
  deleteResumesAPI(uuids.value).then(res => {
    if (res) ElNotification.success({ title: res.data });
    getDataList();
  });
};

const uuids = ref<string[]>([]);
const tableRowSelect = (selected: IResume[]) => {
  uuids.value = selected.map((item: IResume) => item.uuid);
};

onMounted(() => {
  getDataList();
  getResumeSectionsList();
  uuids.value = [];
});

const resumeSections = ref<IValueAndText[]>([]);
const getResumeSectionsList = () => {
  getResumeSections().then(res => {
    if (!res) return;
    resumeSections.value = res.data.map((item: IResumeSection) => ({
      value: item.uuid,
      text: item.ordernum + '.' + item.section,
    }));
  });
};

const tableFilter = (filters: { section: string[] }) => {
  searchForm.value.section = filters.section[0];
  listQuery.value = { currentPage: 1, pagesize: 10 };
  getDataList();
};
</script>

<template>
  <MJTXCard padding>
    <ResumePopup @popupClose="getDataList" action="insert" />
    <el-popconfirm title="确认删除？" @confirm="deleteBatch">
      <template #reference>
        <el-button type="danger" :disabled="uuids.length === 0"
          >删除选中</el-button
        >
      </template>
    </el-popconfirm>
    <ResumeSectionListPopup @popupClose="getDataList" />
  </MJTXCard>
  <MJTXCard padding>
    <el-table
      ref="tableRef"
      :data="tableData"
      style="width: 100%"
      max-height="calc(100vh - 280px)"
      @selectionChange="tableRowSelect"
      @filter-change="tableFilter">
      <el-table-column type="selection" width="55" />
      <el-table-column
        prop="section_name"
        label="板块"
        :filters="resumeSections"
        :filter-multiple="false"
        column-key="section">
        <template #default="scope">
          <el-tag type="danger" v-if="!scope.row.section_enabled">停用</el-tag>
          {{ scope.row.section_order }}.{{ scope.row.section_name }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题">
        <template #default="scope">
          <el-tag type="danger" v-if="!scope.row.enabled">停用</el-tag>
          {{ scope.row.ordernum }}.{{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="添加时间" />
      <el-table-column prop="update_time" label="最后更新时间" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <ResumePopup
            :uuid="scope.row.uuid"
            @popupClose="getDataList"
            action="update" />
          <ResumePopup
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
