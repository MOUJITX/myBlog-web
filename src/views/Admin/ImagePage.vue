<script setup lang="ts">

import MJTXCard from "@/components/publicUI/MJTXCard.vue";
import {onMounted, ref} from "vue";
import MJTXPagination from "@/components/publicUI/MJTXPagination.vue";
import {IFile} from "@/api/types";
import {deleteFileAPI, deleteFilesAPI, getImagesPage} from "@/api/file";
import {ElNotification, TabsPaneContext} from "element-plus";
import MJTXRouterLink from "@/components/publicUI/MJTXRouterLink.vue";
import MJTXImageUpload from "@/components/publicUI/MJTXImageUpload.vue";
import MJTXImageGridUpload from "@/components/publicUI/MJTXImageGridUpload.vue";

const tableData = ref<IFile[]>([])
const listQuery = ref({currentPage: 1, pagesize: 10});
const total = ref(10)

const getDataList = () => {
  getImagesPage(listQuery.value.currentPage,listQuery.value.pagesize).then(res => {
    if (!res) return;
    tableData.value = res.data.list
    total.value = res.data.total
  })
}

const deleteSingle = (id: string) => {
  deleteFileAPI(id).then(res => {
    if (res) ElNotification.success({title: res.data})
    getDataList()
  })
}

const deleteBatch = () => {
  deleteFilesAPI(uuids.value).then(res=>{
    if (res) ElNotification.success({title: res.data})
    getDataList()
  })
}

const uuids = ref<string[]>([])
const tableRowSelect = (selected:IFile[]) => {
  uuids.value = selected.map((item:IFile) => item.uuid)
}

onMounted(()=>{
  getDataList()
  uuids.value = []
})


const tabsName = 'list'
const handleClick = (tab: TabsPaneContext) => {
  if (tab.paneName === 'list'){
    getDataList()
  }
}

const selectImages = ref<string[]>([])
</script>

<template>
  <MJTXCard padding>
    <el-popconfirm title="确认删除？" @confirm="deleteBatch">
      <template #reference>
        <el-button type="danger" :disabled="uuids.length === 0">删除选中</el-button>
      </template>
    </el-popconfirm>
  </MJTXCard>
  <MJTXCard padding>
    <el-tabs v-model="tabsName" @tab-click="handleClick">
      <el-tab-pane label="列表视图" name="list">
        <el-table ref="tableRef" :data="tableData" style="width: 100%" max-height="calc(100vh - 330px)" @selectionChange="tableRowSelect">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="file_name" label="图片名">
            <template #default="scope">
              <MJTXRouterLink :to="scope.row.download_url" target="_blank">
                <el-link type="primary">{{ scope.row.file_name+scope.row.end_name }}</el-link>
              </MJTXRouterLink>
            </template>
          </el-table-column>
          <el-table-column prop="download_url" label="配图" width="150">
            <template #default="scope">
              <MJTXImageUpload v-model="scope.row.download_url" disabled/>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="图片类型"  width="200"/>
          <el-table-column prop="source_url" label="来源" width="100">
            <template #default="scope">
              <MJTXRouterLink :to="scope.row.source_url" v-if="scope.row.source_url">
                <el-link type="primary">来源网址</el-link>
              </MJTXRouterLink>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="添加时间" width="200"/>
          <el-table-column prop="update_time" label="最后更新时间" width="200"/>
          <el-table-column fixed="right" label="操作" width="60">
            <template #default="scope">
              <el-popconfirm title="确认删除？" @confirm="deleteSingle(scope.row.uuid)">
                <template #reference>
                  <el-button link type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <MJTXPagination v-model:current-page="listQuery.currentPage" v-model:page-size="listQuery.pagesize" :total="total" @handleChange="getDataList()" />
      </el-tab-pane>
      <el-tab-pane label="网格视图" name="grid">
        <MJTXImageGridUpload v-model="selectImages"/>
        <span>{{selectImages}}</span>
      </el-tab-pane>
      <el-tab-pane label="按钮" name="button">
        <MJTXImageGridUpload v-model="selectImages" show-btn/>
        <span>{{selectImages}}</span>
        <MJTXImageGridUpload v-model="selectImages" show-btn :limit="1"/>
        <span>{{selectImages}}</span>
      </el-tab-pane>
    </el-tabs>
  </MJTXCard>
</template>

<style scoped lang="scss">

</style>
