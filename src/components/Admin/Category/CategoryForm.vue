<script lang="ts" setup>
import {reactive, ref, defineEmits, defineProps, onMounted, PropType} from 'vue'
import {ElNotification, FormInstance, FormRules} from 'element-plus'
import {ICategory} from "@/api/types";
import MJTXImageUpload from "@/components/publicUI/MJTXImageUpload.vue";
import {defaultCategory, insetCategory, selectCategoryByID, updateCategory} from "@/api/category";

const props = defineProps({
  uuid:{
    type: String,
    default: null
  },
  action:{
    type: String as PropType<'insert' | 'update' | 'copy'>,
    required: true,
  },
  currentUUID:{
    type: String,
    required: true
  }
})

const rules = reactive<FormRules<ICategory>>({
  category:[
    {required: true, message:'不允许为空', trigger: 'blur'}
  ],
  banner_image:[
    {required: true, message:'不允许为空', trigger: 'blur'}
  ]
})

const formRef = ref<FormInstance>()
const categoryForm = ref<ICategory>({...defaultCategory})

onMounted(()=>{
  if (props.action !== 'insert') {
    selectCategoryByID(props.uuid).then(res=>{
      if (!res) {
        emit('handle-close')
        return;
      }
      categoryForm.value = res.data
    })
  } else {
    categoryForm.value.father_uuid = props.currentUUID
  }
})

const emit = defineEmits(['handle-close'])
const submitForm = async (formRef: FormInstance) => {
  await formRef.validate(valid => {
    if (valid) {
      if (props.action === 'update'){
        updateCategory(categoryForm.value).then(res=>{
          if (!res) return;
          ElNotification.success({title: res.data})
          emit('handle-close')
        })
      } else {
        insetCategory(categoryForm.value).then(res=>{
          if (!res) return;
          ElNotification.success({title: res.data})
          emit('handle-close')
        })
      }
    }
  })
}
const resetForm = () => {
  categoryForm.value = {...defaultCategory}
}

</script>

<template>
  <el-form ref="formRef" :model="categoryForm" :rules="rules" label-width="auto" status-icon>
    <el-form-item label="栏目" prop="category">
      <el-input v-model="categoryForm.category" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="categoryForm.description" type="textarea" />
    </el-form-item>
    <el-form-item label="配图" prop="banner_image">
      <MJTXImageUpload v-model="categoryForm.banner_image" is-picker />
    </el-form-item>
    <el-form-item label=" ">
      <el-button type="primary" @click="submitForm(formRef!)">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
