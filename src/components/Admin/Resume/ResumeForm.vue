<script lang="ts" setup>
import {reactive, ref, defineEmits, defineProps, onMounted, PropType} from 'vue'
import {ElNotification, FormInstance, FormRules} from 'element-plus'
import MJTXImageUpload from "@/components/publicUI/MJTXImageUpload.vue";
import {IResume, IResumeSection} from "@/api/types";
import {defaultResume, insetResume, selectResumeByID, updateResume} from "@/api/resume";
import InfoCard from "@/components/Home/InfoCard.vue";
import {getResumeSections} from "@/api/resumeSection";
import MJTXTinymceEditor from "@/components/publicUI/MJTXTinymceEditor.vue";

const props = defineProps({
  uuid:{
    type: String,
    default: null
  },
  action:{
    type: String as PropType<'insert' | 'update' | 'copy'>,
    required: true,
  }
})

const rules = reactive<FormRules<IResume>>({
  section:[
    {required: true, message:'不允许为空', trigger: 'blur'}
  ],
  ordernum:[
    {required: true, message:'不允许为空', trigger: 'blur'}
  ],
  title:[
    {required: true, message:'不允许为空', trigger: 'blur'}
  ],
  direction:[
    {required: true, message:'不允许为空', trigger: 'blur'}
  ],
})

const formRef = ref<FormInstance>()
const resumeForm = ref<IResume>({...defaultResume})
const isText = ref<boolean>(true)
const resumeSections = ref<IResumeSection[]>([])

onMounted(()=>{
  if (props.action !== 'insert') {
    selectResumeByID(props.uuid).then(res=>{
      if (!res) {
        emit('handle-close')
        return;
      }
      resumeForm.value = res.data
      isText.value = !res.data.icon.icon.startsWith('/files')
    })
  }
  getResumeSectionsList()
})

const getResumeSectionsList = () => {
  getResumeSections().then(res => {
    if (!res) return;
    resumeSections.value = res.data
  })
}

const emit = defineEmits(['handle-close'])
const submitForm = async (formRef: FormInstance) => {
  await formRef.validate(valid => {
    if (valid) {
      if (props.action === 'update'){
        updateResume(resumeForm.value).then(res=>{
          if (!res) return;
          ElNotification.success({title: res.data})
          emit('handle-close')
        })
      } else {
        insetResume(resumeForm.value).then(res=>{
          if (!res) return;
          ElNotification.success({title: res.data})
          emit('handle-close')
        })
      }
    }
  })
}
const resetForm = () => {
  resumeForm.value = {...defaultResume}
}


</script>

<template>
  <el-form ref="formRef" :model="resumeForm" :rules="rules" label-width="auto" status-icon>
    <el-form-item label="预览">
      <InfoCard :icon="resumeForm.icon.icon"
                :icon-background="resumeForm.icon.backgroundColor"
                :icon-padding="resumeForm.icon.iconPadding"
                :icon-type="resumeForm.icon.iconType"
                :icon-color="resumeForm.icon.textColor"
                :description="resumeForm.description"
                :isopen="resumeForm.isopen"
                :sub-title="resumeForm.subtitle"
                :title="resumeForm.title"
                :direction="resumeForm.direction"
                :min-width="resumeForm.min_width"
                :max-width="resumeForm.max_width" />
    </el-form-item>
    <el-form-item label="板块" prop="section">
      <el-select v-model="resumeForm.section">
        <el-option v-for="item in resumeSections"
                   :key="item.uuid"
                   :value="item.uuid"
                   :label="item.section"
                   :disabled="!item.enabled">
            <el-tag type="danger" v-if="!item.enabled">停用</el-tag>{{ item.section }}
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="启用" prop="enabled">
      <el-switch v-model="resumeForm.enabled" />
    </el-form-item>
    <el-form-item label="排序" prop="ordernum">
      <el-input-number v-model="resumeForm.ordernum" min="0"/>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="resumeForm.title" />
    </el-form-item>
    <el-form-item label="副标题" prop="subtitle">
      <el-input v-model="resumeForm.subtitle" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <MJTXTinymceEditor v-model="resumeForm.description" :height="400" size="mini"/>
<!--      <el-input v-model="resumeForm.description" type="textarea" />-->
<!--      <MJTXWangEditor v-model="resumeForm.description" />-->
    </el-form-item>
    <el-form-item label="展开" prop="isopen">
      <el-switch v-model="resumeForm.isopen" />
    </el-form-item>
    <el-form-item label="方向" prop="direction">
      <el-radio-group v-model="resumeForm.direction">
        <el-radio-button label="row" value="row" key="row">横向</el-radio-button>
        <el-radio-button label="column" value="column" key="column">纵向</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="宽度" prop="min_width">
      <el-input-number v-model="resumeForm.min_width" :min="0"></el-input-number>
      -
      <el-input-number v-model="resumeForm.max_width" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item label="图标">
      <el-form label-width="auto">
        <el-form-item label="类型">
          <el-radio-group v-model="isText" @change="resumeForm.icon.icon = ''">
            <el-radio-button label="text" :value="true" key="text">文字图标</el-radio-button>
            <el-radio-button label="img" :value="false" key="img">图片图标</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图标">
          <MJTXImageUpload v-model="resumeForm.icon.icon" v-if="!isText" is-picker/>
          <el-input v-model="resumeForm.icon.icon" v-else/>
        </el-form-item>
<!--        <el-form-item label="边框">-->
<!--          <el-radio-group v-model="resumeForm.icon.iconType">-->
<!--            <el-radio-button label="circle" value="circle" key="circle">圆形</el-radio-button>-->
<!--            <el-radio-button label="round" value="round" key="round">圆角</el-radio-button>-->
<!--            <el-radio-button label="square" value="square" key="square">方形</el-radio-button>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
        <el-form-item label="边距" v-if="!isText">
          <el-switch v-model="resumeForm.icon.iconPadding"></el-switch>
        </el-form-item>
        <el-form-item label="文字" v-if="isText">
          <el-color-picker v-model="resumeForm.icon.textColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="背景">
          <el-color-picker v-model="resumeForm.icon.backgroundColor"></el-color-picker>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label=" ">
      <el-button type="primary" @click="submitForm(formRef!)">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
