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
  import { IResumeSection } from '@/api/types';
  import {
    defaultResumeSection,
    insetResumeSection,
    selectResumeSectionByID,
    updateResumeSection,
  } from '@/api/resumeSection';

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

  const rules = reactive<FormRules<IResumeSection>>({
    ordernum: [{ required: true, message: '不允许为空', trigger: 'blur' }],
    section: [{ required: true, message: '不允许为空', trigger: 'blur' }],
    description: [{ required: false, message: '不允许为空', trigger: 'blur' }],
  });

  const formRef = ref<FormInstance>();
  const resumeSectionForm = ref<IResumeSection>({ ...defaultResumeSection });

  onMounted(() => {
    if (props.action !== 'insert') {
      selectResumeSectionByID(props.uuid).then(res => {
        if (!res) {
          emit('handle-close');
          return;
        }
        resumeSectionForm.value = res.data;
      });
    }
  });

  const emit = defineEmits(['handle-close']);
  const submitForm = async (formRef: FormInstance) => {
    await formRef.validate(valid => {
      if (valid) {
        if (props.action === 'update') {
          updateResumeSection(resumeSectionForm.value).then(res => {
            if (!res) return;
            ElNotification.success({ title: res.data });
            emit('handle-close');
          });
        } else {
          insetResumeSection(resumeSectionForm.value).then(res => {
            if (!res) return;
            ElNotification.success({ title: res.data });
            emit('handle-close');
          });
        }
      }
    });
  };
  const resetForm = () => {
    resumeSectionForm.value = { ...defaultResumeSection };
  };
</script>

<template>
  <el-form
    ref="formRef"
    :model="resumeSectionForm"
    :rules="rules"
    label-width="auto"
    status-icon>
    <el-form-item label="排序" prop="ordernum">
      <el-input-number v-model="resumeSectionForm.ordernum" min="0" />
    </el-form-item>
    <el-form-item label="模块" prop="section">
      <el-input v-model="resumeSectionForm.section" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="resumeSectionForm.description" type="textarea" />
    </el-form-item>
    <el-form-item label="启用" prop="enabled">
      <el-switch v-model="resumeSectionForm.enabled" />
    </el-form-item>
    <el-form-item label="同行显示" prop="isrow">
      <el-switch v-model="resumeSectionForm.isrow" />
    </el-form-item>
    <el-form-item label="宽度%" prop="min_width">
      <el-input-number
        v-model="resumeSectionForm.min_width"
        min="0"
        max="100" />
      -
      <el-input-number
        v-model="resumeSectionForm.max_width"
        min="0"
        max="100" />
    </el-form-item>
    <el-form-item label=" ">
      <el-button type="primary" @click="submitForm(formRef!)">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
