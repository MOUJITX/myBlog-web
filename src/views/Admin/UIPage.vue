<script setup lang="ts">
import MJTXCard from '@/components/publicUI/MJTXCard.vue';
import MJTXIcon from '@/components/publicUI/MJTXIcon.vue';
import MJTXFormButton from '@/components/publicUI/MJTXFormButton.vue';
import MJTXTimeLine from '@/components/publicUI/MJTXTimeLine.vue';
import MJTXTextLine from '@/components/publicUI/MJTXTextLine.vue';
import MJTXTag from '@/components/publicUI/MJTXTag.vue';
import MJTXPagination from '@/components/publicUI/MJTXPagination.vue';
import { ref } from 'vue';
import InfoCard from '@/components/Home/InfoCard.vue';
import MJTXImageUpload from '@/components/publicUI/MJTXImageUpload.vue';
import TagForm from '@/components/Admin/Tag/TagForm.vue';
import MJTXTinymceEditor from '@/components/publicUI/MJTXTinymceEditor.vue';

const listQuery = ref({ currentPage: 1, pagesize: 10 });
const total = 100;

const richText = ref();

const imageUrl = ref<string>();
const imageUrls = ref<string[]>([]);
</script>

<template>
  <h1 style="text-align: center">Public - 公共UI组件库</h1>
  <li>MJTXCard - 内容卡片</li>
  <MJTXCard title="标题" padding>
    <div>title:String 可选 标题</div>
    <div>padding:Boolean 可选 内边距</div>
    <div>min-width:Number 可选 最小宽度</div>
    <div>slot 卡片内容</div>
  </MJTXCard>

  <li>MJTXIcon - 图标</li>
  <MJTXCard padding>
    <div style="display: flex">
      <MJTXIcon
        size="48"
        backgroundColor="dodgerblue"
        text-color="white"
        icon="标"
        type="round" />
      <MJTXIcon
        size="48"
        backgroundColor="dodgerblue"
        text-color="white"
        icon="api/"
        type="round"
        padding />
    </div>
    <div>size:String 尺寸</div>
    <div>backgroundColor:String 背景色</div>
    <div>text-color:String 文字色</div>
    <div>icon:String 图标/api开头为图片，否则为文字</div>
    <div>
      type:String('circle' | 'round' | 'square') 图标类型(圆形、圆角、方型)
    </div>
    <div>padding:Boolean 内边距</div>
  </MJTXCard>

  <li>InfoCard - 带图标的内容卡片</li>
  <MJTXCard padding>
    <div style="display: flex">
      <InfoCard
        icon="图"
        description="描述文字"
        sub-title="子标题"
        title="标题" />

      <InfoCard
        icon="api/标"
        description="描述文字"
        sub-title="子标题"
        title="标题"
        direction="column"
        icon-padding />
    </div>
    <div>title:String 标题</div>
    <div>subTitle:String 子标题</div>
    <div>description:String 描述</div>
    <div>direction('row' | 'column'):String 方向</div>
    <div>minWidth:Number 最小宽度</div>
    <div>icon:String 图标</div>
    <div>iconSize:String 图标大小</div>
    <div>iconBackground:String 图标背景色</div>
    <div>iconColor:String 图标文字色</div>
    <div>iconType:String 图标类型</div>
    <div>iconPadding:Boolean 图标内边距</div>
  </MJTXCard>

  <li>MJTXPagination - 表格分页导航栏</li>
  <MJTXCard padding>
    <MJTXPagination
      v-model:current-page="listQuery.currentPage"
      v-model:page-size="listQuery.pagesize"
      :total="total" />
    <div>v-model:current-page 当前页</div>
    <div>v-model:page-size 页大小</div>
    <div>total:Number 总计</div>
    <div>
      layout:String 显示内容 total总计, sizes页大小调整, prev上一页,
      pager页面选择, next下一页
    </div>
    <div>pageSizes:Array 页大小调整</div>
    <div>background:Boolean 背景</div>
    <div>hideOnSinglePage:Boolean 单页时隐藏</div>
  </MJTXCard>

  <li>MJTXTag - 标签</li>
  <MJTXCard padding>
    <MJTXTag tag="标签" />
    <div>tag:String 标签</div>
    <div>slot 标签</div>
  </MJTXCard>

  <li>MJTXTextLine - 有下划线的文本</li>
  <MJTXCard padding>
    <MJTXTextLine text="下划线文本" size="26px" />
    <div>text:String 文本内容</div>
    <div>size:String 文本大小</div>
  </MJTXCard>

  <li>MJTXTimeLine - 时间线</li>
  <MJTXCard padding>
    <MJTXTimeLine
      time="2024"
      time-size="large"
      event="事件主标题"
      description="描述内容" />
    <MJTXTimeLine time="07/01" time-size="medium" description="12"
      ><div>123</div></MJTXTimeLine
    >
    <MJTXTimeLine event="test text" />
    <div>time:String 时间</div>
    <div>timeSize:String('small' | 'medium' |'large') 时间文本大小</div>
    <div>event:String 事件主标题</div>
    <div>description:String 描述内容</div>
    <div>slot 事件主标题</div>
  </MJTXCard>

  <li>MJTXFormButton - 弹窗按钮</li>
  <MJTXCard padding>
    <MJTXFormButton type="primary" form="dialog" button-title="弹窗">
      <TagForm action="insert" />
    </MJTXFormButton>
    <MJTXFormButton type="success" form="drawer" button-title="抽题">
      <template #default>
        <TagForm action="insert" />
      </template>
      <template #footer> footer </template>
    </MJTXFormButton>
    <MJTXFormButton
      type="text"
      form="page"
      button-title="当前页面"
      router-path="/admin/setting"
      >当前页面打开</MJTXFormButton
    >
    <MJTXFormButton form="tab" button-title="新标签页" router-path="/"
      >新标签页打开</MJTXFormButton
    >
    <div>
      type:String("primary" | "success" | "warning" | "danger" | "info" |
      "text") 按钮类型
    </div>
    <div>form:String("dialog" | "drawer" | "page" | "tab") 必选 打开方式</div>
    <div>routerPath:String 跳转链接（仅page和tab适用）</div>
    <div>
      drawerDirection:String("ltr" | "rtl" | "ttb" | "btt")
      抽屉打开方向（仅drawer适用）
    </div>
    <div>buttonTitle:String 按钮文字</div>
    <div>formTitle:String 弹窗标题（仅dialog和drawer适用）</div>
    <div>size:String 弹窗尺寸（仅dialog和drawer适用）</div>
    <div>slot:template #default 弹窗内容（仅dialog和drawer）</div>
    <div>slot:template #footer 弹窗底部区域内容（仅dialog和drawer）</div>
  </MJTXCard>

  <li>MJTXImageUpload - 图片上传</li>
  <MJTXCard padding>
    <div>直传-单图</div>
    <MJTXImageUpload v-model="imageUrl" />
    <div>直传-多图无限制</div>
    <MJTXImageUpload v-model="imageUrls" multiple />
    <div>直传-多图限制</div>
    <MJTXImageUpload v-model="imageUrls" multiple :limit="2" />
    <div>选择-单图</div>
    <MJTXImageUpload v-model="imageUrl" is-picker />
    <div>选择-多图无限制</div>
    <MJTXImageUpload v-model="imageUrls" is-picker multiple />
    <div>选择-多图限制</div>
    <MJTXImageUpload v-model="imageUrls" is-picker multiple :limit="1" />
    <div>imageUrl: {{ imageUrl }}</div>
    <div>imageUrls: {{ imageUrls }}</div>
  </MJTXCard>

  <li>MJTXTinyEditor - Tiny富文本编辑器</li>
  <MJTXCard padding>
    <MJTXTinymceEditor v-model="richText" />
    <div v-html="richText"></div>
  </MJTXCard>
</template>

<style scoped lang="scss"></style>
