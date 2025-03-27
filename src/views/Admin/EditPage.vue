<script setup lang="ts">

import MJTXTinymceEditor from "@/components/publicUI/MJTXTinymceEditor.vue";
import {onMounted, reactive, ref} from "vue";
import {IArticle} from "@/api/types";
import {defaultArticle, insetArticle, selectArticleByID, updateArticle} from "@/api/article";
import {ElMessageBox, FormInstance, FormRules} from "element-plus";
import {Flag, StarFilled} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import ArticlePopup from "@/components/Admin/Article/ArticlePopup.vue";
import htmlToText from "@/utils/htmlToText";
import router from "@/router";

const formRef = ref<FormInstance>()
const route = useRoute()
const action = ref<string>(route.params.action as string)
const uuid = ref<string>(route.params.uuid as string)
const path = ref<string>(route.params.path as string)

const articleForm = ref<IArticle>({...defaultArticle})
const load = () => {
  if (action.value !== 'insert') {
    selectArticleByID(uuid.value).then(res=>{
      if (!res) return;
      articleForm.value = res.data
    })
  } else {
    articleForm.value.categories = [path.value]
  }
}
onMounted(()=>{
  load()
})

const rules = reactive<FormRules<IArticle>>({
  title:[
    {required: true, message:'不允许为空', trigger: 'blur'}
  ],
})

const submitForm = async (formRef: FormInstance, isPublic:boolean) => {
  articleForm.value.is_public = isPublic
  await formRef.validate(valid => {
    if (valid) {
      if (action.value === 'update'){
        updateArticle(articleForm.value).then(res=>{
          if (!res) return;
          // ElNotification.success({title: res.data})
          ElMessageBox.confirm('请选择下一步操作', res.data, {confirmButtonText: '留在当前页面', cancelButtonText: '关闭当前页面', type: 'success',})
              .then(() => {load()})
              .catch(() => {window.close()})
        })
      } else {
        insetArticle(articleForm.value).then(res=>{
          if (!res) return;
          // ElNotification.success({title: res.msg})
          ElMessageBox.confirm('请选择下一步操作', res.msg, {confirmButtonText: '留在当前页面', cancelButtonText: '关闭当前页面', type: 'success',})
              .then(() => {
                uuid.value = res.data
                action.value = 'update'
                load()
                router.replace(`/admin/edit/update/${res.data}/${path.value}`)
              })
              .catch(() => {window.close()})
        })
      }
    }
  })
}

const setDescription = (html: string) => {
  // console.log('description',articleForm.value.description === '',articleForm.value.description,)
  if (articleForm.value.description === '')
    articleForm.value.description = htmlToText(html);
}
</script>

<template>
  <el-form ref="formRef" :model="articleForm" :rules="rules" label-width="auto" status-icon class="editPage-container">
    <el-form-item prop="title">
      <el-input class="editPage-title" v-model="articleForm.title" placeholder="请输入标题">
        <template #prepend>标题</template>
        <template #append>
          <el-check-tag :checked="articleForm.is_top" @change="articleForm.is_top = !articleForm.is_top">
            <el-icon><Flag /></el-icon>置顶
          </el-check-tag>
          <el-check-tag type="success" :checked="articleForm.is_original" @change="articleForm.is_original = !articleForm.is_original">
            <el-icon><StarFilled /></el-icon>原创
          </el-check-tag>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <MJTXTinymceEditor v-model="articleForm.full_content" :height="700" @change="setDescription(articleForm.full_content!)"/>
    </el-form-item>
    <el-form-item >
      <div class="editPage-Submit">
        <el-button type="primary" size="large" @click="submitForm(formRef!,true)">{{ action === 'update' ? '保存修改' : '立即发布' }}</el-button>
        <el-button type="warning" size="large" @click="submitForm(formRef!,false)">{{ action === 'update' ? '撤销发布' : '暂缓发布' }}</el-button>
        <ArticlePopup v-model="articleForm" @popupClose="submitForm(formRef!,articleForm.is_public || false)"/>
      </div>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.editPage-container{
  .el-input{
    height: 50px;
    font-size: var(--font-size-large);
  }
  .el-check-tag{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin: 0 3px;
  }
  .editPage-Submit{
    margin: 0 auto;
  }
}
</style>
