<script lang="ts" setup>
import { reactive, ref, defineEmits, defineModel, onMounted } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import MJTXImageUpload from '@/components/publicUI/MJTXImageUpload.vue';
import { IArticle, ICategory, ITag } from '@/api/types';
import { Flag, Link, Refresh, StarFilled } from '@element-plus/icons-vue';
import { getTags } from '@/api/tag';
import { getCategories } from '@/api/category';
import htmlToText from '@/utils/htmlToText';
import TagPopup from '@/components/Admin/Tag/TagPopup.vue';

const articleForm = defineModel<IArticle>();

const rules = reactive<FormRules<IArticle>>({
  title: [{ required: true, message: '不允许为空', trigger: 'blur' }],
  description: [{ required: true, message: '不允许为空', trigger: 'blur' }],
  image_url: [{ required: true, message: '不允许为空', trigger: 'blur' }],
  author: [{ required: true, message: '不允许为空', trigger: 'blur' }],
  categories: [{ required: true, message: '不允许为空', trigger: 'blur' }],
});

const formRef = ref<FormInstance>();
const emit = defineEmits(['handle-close']);
const submitForm = async (formRef: FormInstance) => {
  await formRef.validate(valid => {
    if (valid) {
      emit('handle-close');
    }
  });
};
const tags = ref<ITag[]>([]);
const categories = ref<ICategory[]>();
const getAllTags = () => {
  getTags().then(res => {
    if (!res) return;
    tags.value = res.data;
  });
};

const getAllCategories = () => {
  getCategories().then(res => {
    if (!res) return;
    categories.value = res.data;
  });
};

onMounted(() => {
  getAllTags();
  getAllCategories();
});

const refreshDescription = (content: string | undefined) => {
  if (articleForm.value)
    articleForm.value.description = htmlToText(content || '');
};
</script>

<template>
  <el-form
    ref="formRef"
    :model="articleForm"
    :rules="rules"
    label-width="auto"
    status-icon>
    <el-form-item label="标题" prop="title">
      <el-input v-model="articleForm!.title">
        <template #append>
          <el-check-tag
            type="danger"
            :checked="articleForm!.is_top"
            @change="articleForm!.is_top = !articleForm!.is_top">
            <el-icon><Flag /></el-icon>置顶
          </el-check-tag>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <template #label>
        <div>描述</div>
        <div @click="refreshDescription(articleForm?.full_content?.toString())">
          <el-icon><Refresh /></el-icon>
        </div>
      </template>
      <el-input v-model="articleForm!.description" type="textarea" />
    </el-form-item>
    <el-form-item label="配图" prop="image_url">
      <MJTXImageUpload v-model="articleForm!.image_url" is-picker />
    </el-form-item>
    <el-form-item label="来源" prop="source_url">
      <el-input v-model="articleForm!.source_url">
        <template #append>
          <el-check-tag
            type="primary"
            :checked="articleForm!.is_link"
            @change="articleForm!.is_link = !articleForm!.is_link">
            <el-icon><Link /></el-icon>跳转外链
          </el-check-tag>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="articleForm!.author">
        <template #append>
          <el-check-tag
            type="success"
            :checked="articleForm!.is_original"
            @change="articleForm!.is_original = !articleForm!.is_original">
            <el-icon><StarFilled /></el-icon>原创
          </el-check-tag>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="开启评论">
      <el-switch v-model="articleForm!.is_comment"></el-switch>
    </el-form-item>
    <el-form-item label="密码访问" prop="view_code">
      <div class="articleSetting-viewCode">
        <el-switch v-model="articleForm!.is_private"></el-switch>
        <el-input
          v-model="articleForm!.view_code"
          v-if="articleForm!.is_private" />
      </div>
    </el-form-item>
    <el-form-item label="标签" prop="tags">
      <el-select v-model="articleForm!.tags" multiple filterable>
        <el-option
          v-for="item in tags"
          :key="item.uuid"
          :label="item.tag"
          :value="item.uuid" />
      </el-select>
      <TagPopup @popupClose="getAllTags" action="insert" />
    </el-form-item>
    <el-form-item label="目录" prop="categories">
      <el-tree-select
        v-model="articleForm!.categories"
        :data="categories"
        multiple
        :render-after-expand="false"
        show-checkbox
        check-strictly
        check-on-click-node
        node-key="uuid"
        :props="{ children: 'children', label: 'category' }" />
    </el-form-item>
    <el-form-item label="发布日期" prop="create_time">
      <el-date-picker
        v-model="articleForm!.create_time"
        type="datetime"
        placeholder="发布日期"
        value-format="YYYY-MM-DD h:m:s" />
    </el-form-item>
    <el-form-item label=" ">
      <el-button type="primary" @click="submitForm(formRef!)">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.el-check-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}
.articleSetting-viewCode {
  display: flex;
  align-items: center;
  width: 100%;

  .el-input {
    padding-left: 10px;
  }
}
</style>
