<script setup lang="ts">

import MJTXCard from "@/components/publicUI/MJTXCard.vue";
import {onMounted, ref} from "vue";
import MJTXPagination from "@/components/publicUI/MJTXPagination.vue";
import {ElNotification} from "element-plus";
import {deletePhotoAPI, deletePhotosAPI, getPhotoPage} from "@/api/photo";
import {IPhoto} from "@/api/types";
import MJTXImageUpload from "@/components/publicUI/MJTXImageUpload.vue";
import PhotoPopup from "@/components/Admin/Photo/PhotoPopup.vue";

const tableData = ref<IPhoto[]>([])
const listQuery = ref({currentPage: 1, pagesize: 10});
const total = ref(10)

const getDataList = () => {
  getPhotoPage(listQuery.value.currentPage,listQuery.value.pagesize).then(res => {
    if (!res) return;
    tableData.value = res.data.list
    total.value = res.data.total
  })
}

const deleteSingle = (id: string) => {
  deletePhotoAPI(id).then(res => {
    if (res) ElNotification.success({title: res.data})
    getDataList()
  })
}

const deleteBatch = () => {
  deletePhotosAPI(uuids.value).then(res=>{
    if (res) ElNotification.success({title: res.data})
    getDataList()
  })
}

const uuids = ref<string[]>([])
const tableRowSelect = (selected:IPhoto[]) => {
  uuids.value = selected.map((item:IPhoto) => item.uuid)
}

onMounted(()=>{
  getDataList()
  uuids.value = []
})

</script>

<template>
  <MJTXCard padding>
    <PhotoPopup @popupClose="getDataList" action="insert"/>
    <el-popconfirm title="确认删除？" @confirm="deleteBatch">
      <template #reference>
        <el-button type="danger" :disabled="uuids.length === 0">删除选中</el-button>
      </template>
    </el-popconfirm>
  </MJTXCard>
  <MJTXCard padding>
    <el-table ref="tableRef" :data="tableData" style="width: 100%" max-height="calc(100vh - 280px)" @selectionChange="tableRowSelect">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="index_img" label="主图">
        <template #default="scope">
          <MJTXImageUpload v-model="scope.row.index_img" disabled v-if="scope.row.index_img"/>
        </template>
      </el-table-column>
      <el-table-column prop="is_public" label="公开" />
      <el-table-column prop="create_time" label="添加时间" />
      <el-table-column prop="update_time" label="最后更新时间" />
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <PhotoPopup :uuid="scope.row.uuid" @popupClose="getDataList" action="update"/>
          <PhotoPopup :uuid="scope.row.uuid" @popupClose="getDataList" action="copy"/>
          <el-popconfirm title="确认删除？" @confirm="deleteSingle(scope.row.uuid)">
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <MJTXPagination v-model:current-page="listQuery.currentPage" v-model:page-size="listQuery.pagesize" :total="total" @handleChange="getDataList()" />
  </MJTXCard>
</template>

<style scoped lang="scss">

</style>
