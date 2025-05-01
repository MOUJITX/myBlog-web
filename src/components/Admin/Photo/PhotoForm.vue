<script lang="ts" setup>
  import {
    reactive,
    ref,
    defineEmits,
    defineProps,
    onMounted,
    PropType,
  } from 'vue';
  import { ElNotification, FormInstance, FormRules } from 'element-plus';
  import MJTXImageUpload from '@/components/publicUI/MJTXImageUpload.vue';
  import { IPhoto } from '@/api/types';
  import {
    defaultPhoto,
    defaultPhotoImage,
    insetPhoto,
    selectPhotoByID,
    updatePhoto,
  } from '@/api/photo';

  const props = defineProps({
    uuid: {
      type: String,
      default: null,
    },
    action: {
      type: String as PropType<'insert' | 'update' | 'copy'>,
      required: true,
    },
  });

  const rules = reactive<FormRules<IPhoto>>({
    title: [{ required: true, message: '不允许为空', trigger: 'blur' }],
    index_img: [{ required: true, message: '不允许为空', trigger: 'blur' }],
  });

  const formRef = ref<FormInstance>();
  const photoForm = ref<IPhoto>({ ...defaultPhoto });

  onMounted(() => {
    if (props.action !== 'insert') {
      selectPhotoByID(props.uuid).then(res => {
        if (!res) {
          emit('handle-close');
          return;
        }
        photoForm.value = res.data;
      });
    }
  });

  const emit = defineEmits(['handle-close']);
  const submitForm = async (formRef: FormInstance) => {
    await formRef.validate(valid => {
      if (valid) {
        if (props.action === 'update') {
          updatePhoto(photoForm.value).then(res => {
            if (!res) return;
            ElNotification.success({ title: res.data });
            emit('handle-close');
          });
        } else {
          insetPhoto(photoForm.value).then(res => {
            if (!res) return;
            ElNotification.success({ title: res.data });
            emit('handle-close');
          });
        }
      }
    });
  };
  const resetForm = () => {
    photoForm.value = { ...defaultPhoto };
  };

  const editGroupValue = ref(0);
  const editImageGroup = (targetIndex: number, action: 'remove' | 'add') => {
    console.log(targetIndex, action);
    if (action === 'add') {
      //editGroupValue.value = photoForm.value.images.length;
      photoForm.value.images.splice(editGroupValue.value, 0, {
        ...defaultPhotoImage,
      });
      photoForm.value.images[editGroupValue.value].images = [];
    } else if (action === 'remove') {
      if (targetIndex === editGroupValue.value)
        editGroupValue.value = targetIndex - 1;
      else if (targetIndex < editGroupValue.value)
        editGroupValue.value = editGroupValue.value - 1;
      photoForm.value.images.splice(targetIndex, 1);
    }
  };
</script>

<template>
  <el-form
    ref="formRef"
    :model="photoForm"
    :rules="rules"
    status-icon
    label-position="top">
    <el-form-item label="标题" prop="title">
      <el-input v-model="photoForm.title" />
    </el-form-item>
    <el-form-item label="副标题" prop="subtitle">
      <el-input v-model="photoForm.subtitle" />
    </el-form-item>
    <el-form-item label="主图" prop="index_img">
      <MJTXImageUpload v-model="photoForm.index_img" is-picker />
    </el-form-item>
    <el-form-item label="图片" prop="images">
      <el-tabs
        type="border-card"
        style="width: 100%"
        editable
        @edit="editImageGroup"
        v-model="editGroupValue">
        <span v-if="photoForm.images.length === 0">暂无照片组</span>
        <el-tab-pane
          v-else
          v-for="(group, index) in photoForm.images"
          :key="index"
          :label="group.title ? group.title : `第${index + 1}组`"
          :name="index">
          <el-form label-width="auto">
            <el-form-item label="标题">
              <el-input v-model="group.title" />
            </el-form-item>
            <el-form-item label="副标题">
              <el-input v-model="group.subtitle" />
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="group.description" />
            </el-form-item>
            <el-form-item label="照片">
              <MJTXImageUpload v-model="group.images" multiple is-picker />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-form-item>
    <el-form-item label="公开" prop="is_public">
      <el-switch v-model="photoForm.is_public" />
    </el-form-item>
    <el-form-item label=" ">
      <el-button type="primary" @click="submitForm(formRef!)">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
