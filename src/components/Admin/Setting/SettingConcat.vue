<script setup lang="ts">
  import { defineEmits, defineModel, onMounted } from 'vue';
  import { Minus, Plus } from '@element-plus/icons-vue';
  import { IWebsiteConcat } from '@/api/types';
  import { defaultWebsiteConcat } from '@/api/websiteSetting';
  import MJTXImageUpload from '@/components/publicUI/MJTXImageUpload.vue';

  const tableData = defineModel<IWebsiteConcat[]>({ default: [] });

  const emit = defineEmits(['change']);
  const dataEdit = () => {
    emit('change');
  };

  const dataAdd = (index: number) => {
    tableData.value.splice(index + 1, 0, { ...defaultWebsiteConcat });
    dataEdit();
  };

  const dataDel = (index: number) => {
    tableData.value.splice(index, 1);
    if (tableData.value.length === 0)
      tableData.value.push(defaultWebsiteConcat);
    dataEdit();
  };

  onMounted(() => {
    if (tableData.value.length === 0) {
      tableData.value.push(defaultWebsiteConcat);
      dataEdit();
    }
  });
</script>

<template>
  <el-table :data="tableData">
    <el-table-column prop="cc_icon" label="图标">
      <template #default="scope">
        <MJTXImageUpload
          v-model="scope.row.cc_icon"
          is-picker
          @change="dataEdit" />
      </template>
    </el-table-column>
    <el-table-column prop="cc_name" label="方式">
      <template #default="scope">
        <el-input v-model="scope.row.cc_name" @change="dataEdit" />
      </template>
    </el-table-column>
    <el-table-column prop="cc_value" label="说明">
      <template #default="scope">
        <el-input v-model="scope.row.cc_value" @change="dataEdit" />
      </template>
    </el-table-column>
    <el-table-column prop="cc_url" label="链接">
      <template #default="scope">
        <el-input v-model="scope.row.cc_url" @change="dataEdit" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" circle @click="dataAdd(scope.$index)"
          ><el-icon><Plus /></el-icon
        ></el-button>
        <el-button type="danger" circle @click="dataDel(scope.$index)"
          ><el-icon><Minus /></el-icon
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
