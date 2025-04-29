<script setup lang="ts">
import MJTXCard from '@/components/publicUI/MJTXCard.vue';
import { ref, onMounted } from 'vue';
import { IArticle, ICategory } from '@/api/types';
import { deleteCategoryAPI, getCategories } from '@/api/category';
import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';
import {
  Comment,
  Flag,
  Link,
  Lock,
  QuestionFilled,
  Star,
} from '@element-plus/icons-vue';
import CategoryPopup from '@/components/Admin/Category/CategoryPopup.vue';
import { ElNotification } from 'element-plus';
import {
  defaultArticle,
  deleteArticleAPI,
  deleteArticlesAPI,
  getArticlesPage,
} from '@/api/article';
import MJTXFormButton from '@/components/publicUI/MJTXFormButton.vue';
import generateUUID from '@/utils/generateUUID';

const tree = ref<ICategory[]>();
const listQuery = ref({ currentPage: 1, pagesize: 10 });
const total = ref(10);
const tableData = ref<IArticle[]>([]);

const searchForm = ref<IArticle>({ ...defaultArticle });

const getTree = () => {
  getCategories().then(res => {
    if (!res) return;
    tree.value = res.data;
  });
};

const handleNodeClick = (data: ICategory) => {
  searchForm.value.categories = [data.uuid];
  listQuery.value.currentPage = 1;
  getDataList();
};

const reload = () => {
  getDataList();
  getTree();
};

const uuids = ref<string[]>([]);
const tableRowSelect = (selected: IArticle[]) => {
  uuids.value = selected.map((item: IArticle) => item.uuid);
};

onMounted(() => {
  reload();
  uuids.value = [];
});

const deleteSingle = (id: string) => {
  deleteArticleAPI(id).then(res => {
    if (res) ElNotification.success({ title: res.data });
    reload();
  });
};

const deleteBatch = () => {
  deleteArticlesAPI(uuids.value).then(res => {
    if (res) ElNotification.success({ title: res.data });
    reload();
  });
};

const getDataList = () => {
  getArticlesPage(
    listQuery.value.currentPage,
    listQuery.value.pagesize,
    searchForm.value,
  ).then(res => {
    if (!res) return;
    tableData.value = res.data.list;
    total.value = res.data.total;
  });
};

const deleteCategorySingle = (id: string) => {
  deleteCategoryAPI(id).then(res => {
    if (res) ElNotification.success({ title: res.data });
    searchForm.value.categories = [''];
    reload();
  });
};

// const editArticleInfo = (article:IArticle) => {
//   console.log('123')
// }
</script>

<template>
  <div class="articlePage-container">
    <div class="articlePage-tree">
      <MJTXCard padding>
        <el-tree
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          :data="tree"
          :props="{ children: 'children', label: 'category' }"
          @node-click="handleNodeClick">
          <template #default="{ node, data }">
            <span class="articlePage-tree-button">
              <span>{{ node.label }}</span>
              <span>
                <CategoryPopup
                  link
                  action="insert"
                  @popupClose="reload"
                  :currentUUID="data.uuid" />
                <el-popconfirm
                  title="确认删除？"
                  @confirm="deleteCategorySingle(data.uuid)">
                  <template #reference>
                    <el-button link type="danger" :disabled="data.hasChildren"
                      >删除</el-button
                    >
                  </template>
                </el-popconfirm>
              </span>
            </span>
          </template>
        </el-tree>
      </MJTXCard>
    </div>
    <div class="article-table">
      <MJTXCard padding>
        <MJTXFormButton
          type="primary"
          form="tab"
          button-title="新增"
          :disabled="searchForm.categories![0] === ''"
          :router-path="`edit/insert/${generateUUID()}/${searchForm.categories![0]}`" />
        <el-popconfirm title="确认删除？" @confirm="deleteBatch">
          <template #reference>
            <el-button type="danger" :disabled="uuids.length === 0"
              >删除选中</el-button
            >
          </template>
        </el-popconfirm>
      </MJTXCard>
      <MJTXCard padding>
        <el-table
          ref="tableRef"
          :data="tableData"
          style="width: 100%"
          max-height="calc(100vh - 280px)"
          @selectionChange="tableRowSelect">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="title" label="标题">
            <template #default="scope">
              <div class="article-table-title">
                <router-link
                  :to="`/article/${scope.row.uuid}`"
                  target="_blank"
                  >{{ scope.row.title }}</router-link
                >
                <el-tooltip
                  :content="scope.row.description"
                  v-if="scope.row.description">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
                <el-tooltip content="置顶" v-if="scope.row.is_top">
                  <el-icon><Flag /></el-icon>
                </el-tooltip>
                <el-tooltip content="原创" v-if="scope.row.is_original">
                  <el-icon><Star /></el-icon>
                </el-tooltip>
                <el-tooltip content="允许评论" v-if="scope.row.is_comment">
                  <el-icon><Comment /></el-icon>
                </el-tooltip>
                <el-tooltip content="密码访问" v-if="scope.row.is_private">
                  <el-icon><Lock /></el-icon>
                </el-tooltip>
                <el-tooltip content="外部链接" v-if="scope.row.is_link">
                  <el-icon><Link /></el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="is_public" label="发布状态" width="100">
            <template #default="scope">
              <el-tag type="success" v-if="scope.row.is_public">已发布</el-tag>
              <el-tag type="info" v-else>未发布</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="添加时间" width="170" />
          <el-table-column
            prop="update_time"
            label="最后更新时间"
            width="170" />
          <el-table-column fixed="right" label="操作" width="170">
            <template #default="scope">
              <MJTXFormButton
                type="primary"
                link
                form="tab"
                button-title="编辑"
                :router-path="`edit/update/${scope.row.uuid}/${scope.row.categories[0]}`" />
              <!--              <ArticlePopup v-model="scope.row" link button-size="default" button-title="属性" type="primary" @popupClose="editArticleInfo(scope.row)"/>-->
              <MJTXFormButton
                type="primary"
                link
                form="tab"
                button-title="复制"
                :router-path="`edit/copy/${scope.row.uuid}/${scope.row.categories[0]}`" />
              <el-popconfirm
                title="确认删除？"
                @confirm="deleteSingle(scope.row.uuid)">
                <template #reference>
                  <el-button link type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <MJTXPagination
          v-model:current-page="listQuery.currentPage"
          v-model:page-size="listQuery.pagesize"
          :total="total"
          @handleChange="getDataList()" />
      </MJTXCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.articlePage-container {
  display: flex;
  .articlePage-tree {
    width: 20%;
    .articlePage-tree-button {
      display: flex;
      flex: 1;
      justify-content: space-between;
    }
  }
  .article-table {
    width: 80%;
    .article-table-title {
      a:hover {
        color: var(--el-color-primary);
        border-bottom: 1px var(--el-color-primary) solid;
      }
    }
  }
}
</style>
