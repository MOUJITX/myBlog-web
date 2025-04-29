<script setup lang="ts">
import MJTXCard from '@/components/publicUI/MJTXCard.vue';
import { onMounted, ref } from 'vue';
import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';
import {
  deleteCategoriesAPI,
  deleteCategoryAPI,
  getCategories,
  getCategoriesPage,
} from '@/api/category';
import { ICategory } from '@/api/types';
import { QuestionFilled } from '@element-plus/icons-vue';
import MJTXImageUpload from '@/components/publicUI/MJTXImageUpload.vue';
import { ElNotification } from 'element-plus';
import CategoryPopup from '@/components/Admin/Category/CategoryPopup.vue';

const tree = ref<ICategory[]>();
const listQuery = ref({ currentPage: 1, pagesize: 10 });
const total = ref(10);
const tableData = ref<ICategory[]>([]);

const currentUUID = ref('root');

const getDataList = () => {
  getCategoriesPage(
    listQuery.value.currentPage,
    listQuery.value.pagesize,
    currentUUID.value,
  ).then(res => {
    if (!res) return;
    tableData.value = res.data.list;
    total.value = res.data.total;
  });
};

const getTree = () => {
  getCategories().then(res => {
    if (!res) return;
    tree.value = res.data;
  });
};

const handleNodeClick = (data: ICategory) => {
  currentUUID.value = data.uuid;
  listQuery.value.currentPage = 1;
  getDataList();
};

const deleteSingle = (id: string) => {
  deleteCategoryAPI(id).then(res => {
    if (res) ElNotification.success({ title: res.data });
    reload();
  });
};

const deleteBatch = () => {
  deleteCategoriesAPI(uuids.value).then(res => {
    if (res) ElNotification.success({ title: res.data });
    reload();
  });
};

const uuids = ref<string[]>([]);
const tableRowSelect = (selected: ICategory[]) => {
  uuids.value = selected.map((item: ICategory) => item.uuid);
};

const reload = () => {
  getDataList();
  getTree();
};

onMounted(() => {
  getTree();
  uuids.value = [];
});
</script>

<template>
  <div class="categoryPage-container">
    <div class="categoryPage-tree">
      <MJTXCard padding>
        <el-tree
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          :data="tree"
          :props="{ children: 'children', label: 'category' }"
          @node-click="handleNodeClick" />
      </MJTXCard>
    </div>

    <div class="categoryPage-table">
      <MJTXCard padding>
        <CategoryPopup
          action="insert"
          @popupClose="reload"
          :currentUUID="currentUUID" />
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
          <el-table-column prop="category" label="栏目">
            <template #default="scope">
              <el-tooltip
                :content="scope.row.description"
                v-if="scope.row.description">
                <div>
                  <span>{{ scope.row.category }}</span>
                  <el-icon><QuestionFilled /></el-icon>
                </div>
              </el-tooltip>
              <span v-else>{{ scope.row.category }}</span>
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
              <CategoryPopup
                :uuid="scope.row.uuid"
                @popupClose="reload"
                action="update"
                :currentUUID="currentUUID" />
              <CategoryPopup
                :uuid="scope.row.uuid"
                @popupClose="reload"
                action="copy"
                :currentUUID="currentUUID" />
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.categoryPage-container {
  display: flex;

  .categoryPage-tree {
    width: 20%;
  }
  .categoryPage-table {
    width: 80%;
  }
}
</style>
