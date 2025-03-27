<script lang="ts" setup>
import {ref, defineModel, defineProps, defineEmits} from 'vue'
import {Delete, Plus} from "@element-plus/icons-vue";
import {ResponseAPI} from "@/api/types";
import {ElNotification} from "element-plus";
import {isMobile} from "@/utils/isMobile";
import MJTXImageGridUpload from "@/components/publicUI/MJTXImageGridUpload.vue";
import { imgToThumb } from '@/utils/imgToThumb';

const token = localStorage.getItem('token')
const fileUrl = defineModel<string | string[] | undefined>({required: true});

const props = defineProps({
  disabled:{
    type: Boolean,
    default: false
  },
  isPicker:{
    type: Boolean,
    default: false
  },
  multiple:{
    type: Boolean,
    default: false
  },
  limit:{
    type: Number
  }
})

const filesUploadSuccess = (res:ResponseAPI) =>{
  if(res.code === 200){
    ElNotification.success({title:"图片上传成功"})
    if (props.multiple) { 
      if (fileUrl.value && Array.isArray(fileUrl.value)) fileUrl.value.push(res.data.url)
      else fileUrl.value = [res.data.url]
    }
    else fileUrl.value = res.data.url
    dataEdit()
  }
}

const filesRemove = (index:number | undefined) => {
  if (index) {
    if (fileUrl.value && Array.isArray(fileUrl.value)) fileUrl.value.splice(index, 1)
  }
  else fileUrl.value = ''
  dataEdit()
}

const formVisible = ref<boolean>(false)
const imagesList = ref<string[]>([])
const dialogOpen = () => {
  if (props.multiple) {
    if (fileUrl.value && Array.isArray(fileUrl.value)) imagesList.value = fileUrl.value
  }
  else { 
    if (fileUrl.value) {
      if (Array.isArray(fileUrl.value)) imagesList.value = fileUrl.value
      else imagesList.value = [fileUrl.value]
    }
    else imagesList.value = []
  }
  formVisible.value = true
}
const dialogConfirm = () => {
  if (props.multiple) fileUrl.value = imagesList.value
  else fileUrl.value = imagesList.value[0]
  formVisible.value = false
  dataEdit()
}
const dialogCancel = () => {
  imagesList.value = []
  formVisible.value = false
}

const emit = defineEmits(['change'])
const dataEdit = () => {
  emit('change')
}
</script>

<template>
  <div class="mjtx-imageUpload-container">
    <div class="mjtx-imageUpload-view mjtx-imageUpload-padding"
         v-for="(item,index) in (props.multiple ? fileUrl : fileUrl ? 1 : 0)"
         :key="index">
      <el-image
          preview-teleported
          fit="contain"
          class="el-upload--picture-card"
          :src="`${props.multiple ? imgToThumb(item as string, 128) : imgToThumb(fileUrl as string, 128) }?token=${token}`"
          :preview-src-list="props.multiple ? fileUrl : [fileUrl]">
      </el-image>
      <el-button type="danger" circle @click="filesRemove(props.multiple ? index : undefined)" class="mjtx-imageUpload-delButton" v-if="!disabled">
        <el-icon><Delete /></el-icon>
      </el-button>
    </div>

    <div v-if="!disabled && (props.multiple
                                ? props.limit ? fileUrl!.length < props.limit : true
                                : !fileUrl)"
         class="mjtx-imageUpload-padding">
      <div class="el-upload--picture-card" v-if="props.isPicker" @click="dialogOpen()">
        <el-icon><Plus /></el-icon>
      </div>
      <el-upload
          v-else
          :action="`/api/files/upload/image?token=${token}`"
          accept="image/*"
          list-type="picture-card"
          :show-file-list="false"
          :on-success="filesUploadSuccess">
        <el-icon><Plus /></el-icon>
      </el-upload>
    </div>

  </div>

  <el-dialog
      append-to-body
      class="form-popup"
      v-model="formVisible"
      title="选择图片"
      :width="isMobile() ? '100%' : '50%'"
      draggable
      overflow
      destroy-on-close
      @close="dialogCancel()">
    <template #default>
      <MJTXImageGridUpload v-model="imagesList" :limit="props.multiple ? limit : 1"/>
    </template>
    <template #footer>
      <span>已选中{{imagesList.length}}张  </span>
      <el-button type="primary" @click="dialogConfirm()">确认</el-button>
      <el-button @click="dialogCancel()">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.mjtx-imageUpload-container{
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
}
.mjtx-imageUpload-view{
  position: relative;

  &:hover{
    .mjtx-imageUpload-delButton{
      display: block;
    }
  }

  .mjtx-imageUpload-delButton {
    display: none;
    position: absolute;
    top: -10px;
    left: 85px;
  }
}

.mjtx-imageUpload-padding{
  padding: 0 20px 20px 0;
}
</style>
