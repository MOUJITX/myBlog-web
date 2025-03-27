<script setup lang="ts">
import {defineEmits, defineModel, onMounted} from 'vue'
import {IWebsiteNavigation} from "@/api/types";
import {Minus, Plus} from "@element-plus/icons-vue";
import {defaultWebsiteNavigation} from "@/api/websiteSetting";
import MJTXImageUpload from "@/components/publicUI/MJTXImageUpload.vue";

const tableData = defineModel<IWebsiteNavigation[]>({default:[]})

const emit = defineEmits(['change'])
const dataEdit = () => {
  console.log('cc')
  emit('change')
}

const dataAdd = (index: number) => {
  tableData.value.splice(index+1, 0, defaultWebsiteNavigation)
  dataEdit()
}

const dataDel = (index: number) => {
  tableData.value.splice(index, 1)
  dataEdit()
}

onMounted(()=>{
  if (tableData.value.length === 0){
    tableData.value.push({
      nav_name: '首页',
      nav_title: '首页',
      nav_subtitle: '',
      nav_url: '/',
      nav_enabled: true,
      nav_banner: []
    })
    dataEdit()
  }
})
</script>

<template>
  <el-table :data="tableData">
    <el-table-column prop="nav_name" label="导航标题">
      <template #default="scope">
        <el-input v-model="scope.row.nav_name" @change="dataEdit" />
      </template>
    </el-table-column>
    <el-table-column prop="nav_title" label="标题">
      <template #default="scope">
        <span v-if="scope.row.nav_url === '/'">{{scope.row.nav_title}}</span>
        <el-input v-else v-model="scope.row.nav_title" @change="dataEdit" />
      </template>
    </el-table-column>
    <el-table-column prop="nav_subtitle" label="副标题">
      <template #default="scope">
        <el-input v-model="scope.row.nav_subtitle" @change="dataEdit" v-if="scope.row.nav_url !== '/'" />
      </template>
    </el-table-column>
    <el-table-column prop="nav_url" label="链接">
      <template #default="scope">
        <span v-if="scope.row.nav_url === '/'">{{scope.row.nav_url}}</span>
        <el-input v-else v-model="scope.row.nav_url" @change="dataEdit" />
      </template>
    </el-table-column>
    <el-table-column prop="nav_enabled" label="显示">
      <template #default="scope">
        <el-switch v-model="scope.row.nav_enabled" @change="dataEdit" />
      </template>
    </el-table-column>
    <el-table-column prop="nav_banner" label="背景图">
      <template #default="scope">
        <MJTXImageUpload v-model="scope.row.nav_banner" is-picker multiple :limit="5" @change="dataEdit"  v-if="scope.row.nav_url !== '/'"/>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" circle @click="dataAdd(scope.$index)"><el-icon><Plus /></el-icon></el-button>
        <el-button type="danger" circle v-if="scope.row.nav_url !== '/'" @click="dataDel(scope.$index)"><el-icon><Minus /></el-icon></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>
