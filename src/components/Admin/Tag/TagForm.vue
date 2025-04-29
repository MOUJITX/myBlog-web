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
import { ITag } from '@/api/types';
import { defaultTag, insetTag, selectTagByID, updateTag } from '@/api/tag';
import MJTXImageUpload from '@/components/publicUI/MJTXImageUpload.vue';

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

const rules = reactive<FormRules<ITag>>({
  tag: [{ required: true, message: '不允许为空', trigger: 'blur' }],
  banner_image: [{ required: true, message: '不允许为空', trigger: 'blur' }],
});

const formRef = ref<FormInstance>();
const tagForm = ref<ITag>({ ...defaultTag });

onMounted(() => {
  if (props.action !== 'insert') {
    selectTagByID(props.uuid).then(res => {
      if (!res) {
        emit('handle-close');
        return;
      }
      tagForm.value = res.data;
    });
  }
});

const emit = defineEmits(['handle-close']);
const submitForm = async (formRef: FormInstance) => {
  await formRef.validate(valid => {
    if (valid) {
      if (props.action === 'update') {
        updateTag(tagForm.value).then(res => {
          if (!res) return;
          ElNotification.success({ title: res.data });
          emit('handle-close');
        });
      } else {
        insetTag(tagForm.value).then(res => {
          if (!res) return;
          ElNotification.success({ title: res.data });
          emit('handle-close');
        });
      }
    }
  });
};
const resetForm = () => {
  tagForm.value = { ...defaultTag };
};
</script>

<template>
  <el-form
    ref="formRef"
    :model="tagForm"
    :rules="rules"
    label-width="auto"
    status-icon>
    <el-form-item label="标签" prop="tag">
      <el-input v-model="tagForm.tag" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="tagForm.description" type="textarea" />
    </el-form-item>
    <el-form-item label="配图" prop="banner_image">
      <MJTXImageUpload v-model="tagForm.banner_image" is-picker />
    </el-form-item>
    <el-form-item label=" ">
      <el-button type="primary" @click="submitForm(formRef!)">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
