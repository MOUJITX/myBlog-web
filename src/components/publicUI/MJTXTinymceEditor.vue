<template>
  <editor v-model="textContent" :init="init" :tinymceScriptSrc="tinymceScriptSrc"></editor>
</template>

<script setup lang="ts">
import {ElNotification} from "element-plus";
import {onMounted, defineProps, defineModel, PropType} from 'vue'
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme' // 主题文件
import 'tinymce/icons/default'
import 'tinymce/models/dom'
// tinymce插件可按自己的需要进行导入

import 'tinymce/plugins/accordion' // 列表插件
import 'tinymce/plugins/advlist' //高级列表(依赖lists插件),包含工具bullist numlist
import 'tinymce/plugins/anchor' //锚点
import 'tinymce/plugins/autolink' //自动链接
import 'tinymce/plugins/autoresize' //编辑器大小自适应
import 'tinymce/plugins/autosave' //自动保存
import 'tinymce/plugins/charmap' //特殊字符
import 'tinymce/plugins/code' //编辑源码
import 'tinymce/plugins/codesample' //代码块
// import 'tinymce/plugins/contextmenu' //快捷菜单
import 'tinymce/plugins/directionality' //文字方向
import 'tinymce/plugins/emoticons' //表情符号
import 'tinymce/plugins/emoticons/js/emojis'
import 'tinymce/plugins/fullscreen' //全屏
import 'tinymce/plugins/image' //插入图片
import 'tinymce/plugins/importcss' //引入css
// import '/public/static/tinymce/plugins/importword' //导入word
import 'tinymce/plugins/insertdatetime' //插入日期时间
import 'tinymce/plugins/link' //超链接
import 'tinymce/plugins/lists' //列表插件
// import '/public/static/tinymce/plugins/letterspacing' //字间距
// import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/nonbreaking' //插入不间断空格
import 'tinymce/plugins/pagebreak' //分页
// import 'tinymce/plugins/paste' //粘贴设置
import 'tinymce/plugins/preview' //预览
import 'tinymce/plugins/quickbars' //快捷栏
import 'tinymce/plugins/save' //保存
import 'tinymce/plugins/searchreplace' //查找替换
import 'tinymce/plugins/table' //表格
// //import 'tinymce/plugins/toc'  //目录生成器
// import '/public/static/tinymce/plugins/upfile' //文件上传
import 'tinymce/plugins/visualblocks' //显示块元素范围
import 'tinymce/plugins/wordcount'
import {uploadImageByURL} from "@/api/article"; // 字数统计

const externalPlugins = { // 引入自定义的插件
  'kityformula-editor': '/tinymce/plugins/kityformula-editor/plugin.min.js',
  formatpainter: '/tinymce/plugins/formatpainter/plugin.min.js',
  imagetools: '/tinymce/plugins/imagetools/plugin.js',
  pasteImage: '/tinymce/plugins/pasteimage/plugin.min.js',
  axupimgs: '/tinymce/plugins/axupimgs/index.js',
  indent2em: '/tinymce/plugins/indent2em/plugin.js',
  toc:'/tinymce/plugins/menu/index.js',
}


const props = defineProps({
  height: Number,
  size:{
    type: String as PropType<'normal' | 'mini'>,
    default: 'normal'
  }
})

const textContent = defineModel()

const plugins = "axupimgs advlist anchor autolink autosave " + //autoresize
    " " + //bdmap bbcode
    "code codesample charmap " +
    " " + //directionality
    "emoticons " +
    "fullscreen " + //fullpage
    "hr " +  //help
    "image imagetools indent2em importword " +  //importcss insertdatetime
    "lists link letterspacing " +
    "media " +
    "pagebreak preview paste print pastewordimage " + //noneditable nonbreaking
    "quickbars " +
    "save searchreplace " +
    "table " +  //tabfocus template textpattern toc
    "upfile " +
    " " + //visualblocks visualchars
    "wordcount "

const toolbar =  "code fullscreen preview print | " +
    "undo redo restoredraft save | " +
    "formatpainter cut copy paste pastetext importword | " +
    "fontselect fontsizeselect | " +
    "alignleft aligncenter alignright alignjustify outdent indent lineheight indent2em letterspacing | " +
    "forecolor backcolor bold italic underline strikethrough | " +
    "codesample hr charmap emoticons  | " +
    "anchor pagebreak | " +
    "bullisxt numlist | " +
    "link image axupimgs media upfile | " +
    "table tablemergecells tablesplitcells| " +
    "blockquote subscript superscript removeformat wordcount kityformula-editor pasteImage | "

const plugins_normal = 'toc anchor pasteImage indent2em axupimgs save accordion lists advlist quickbars autolink link autosave charmap wordcount code codesample directionality emoticons fullscreen image imagetools importcss insertdatetime nonbreaking pagebreak preview searchreplace table visualblocks formatpainter kityformula-editor'

const toolbar_normal =  `undo redo code pastetext formatpainter removeformat | forecolor backcolor styles blocks fontfamily fontsize bold italic underline strikethrough lineheight indent2em | alignleft alignright aligncenter alignjustify
  outdent indent ltr rtl | bullist numlist | blockquote subscript superscript  | link table image axupimgs charmap emoticons hr pagebreak insertdatetime | codesample kityformula-editor
  | print preview fullscreen | wordcount nonbreaking searchreplace visualblocks custom-btn Accordion anchor toc`


const toolbar_mini = `removeformat | forecolor backcolor fontfamily fontsize bold italic underline strikethrough lineheight indent2em
  | alignleft alignright aligncenter alignjustify
  | subscript superscript
  | link image axupimgs charmap emoticons hr kityformula-editor`

const fontSize = '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px 80px 90px 100px 110px'

const fontFormat = '方正小标宋简体=方正小标宋简体; 苹果苹方=PingFang SC, 宋体=宋体,SimSun; 黑体=黑体,SimHei; ' +
    '微软雅黑=微软雅黑,Microsoft Yahei; 微软正黑体=微软正黑体,Microsoft JhengHei; ' +
    '仿宋=仿宋,FangSong; 楷体=楷体,KaiTi; 新宋体=新宋体,NSimSun; ' +
    'Andale Mono=andale mono,times; ' +
    'Arial=arial,helvetica,sans-serif; ' +1
    'Arial Black=arial black,avant garde; ' +
    'Book Antiqua=book antiqua,palatino; ' +
    'Comic Sans MS=comic sans ms,sans-serif; ' +
    'Courier New=courier new,courier; ' +
    'Georgia=georgia,palatino; ' +
    'Helvetica=helvetica; ' +
    'Impact=impact,chicago; ' +
    'Symbol=symbol; ' +
    'Tahoma=tahoma,arial,helvetica,sans-serif; ' +
    'Terminal=terminal,monaco; ' +
    'Times New Roman=times new roman,times; ' +
    'Trebuchet MS=trebuchet ms,geneva; ' +
    'Verdana=verdana,geneva; ' +
    'Webdings=webdings; ' +
    'Wingdings=wingdings,zapf dingbats'

const tinymceScriptSrc = '/tinymce/tinymce.js'
const init = {
  selector: "#tinymce",
  language_url: '/tinymce/langs/zh-Hans.js',
  language: 'zh-Hans',
  skin_url: '/tinymce/skins/ui/oxide', // 皮肤：这里引入的是public下的资源文件
  // skin_url: 'tinymce/skins/ui/oxide-dark',//黑色系
  content_css: '/tinymce/skins/content/default/content.css', //内容区域css样式

  contextmenu_never_use_native:true, //禁用原生右键
  height: props.height,

  branding: false, // 默认会在右下角显示Tiny图标
  plugins: plugins_normal,
  external_plugins: externalPlugins,

  toolbar: props.size === 'normal' ? toolbar_normal : toolbar_mini,
  toolbar_location: '/',
  toolbar_mode: 'wrap', // 工具栏模式: floating sliding scrolling wrap
  toolbar_sticky: true,

  font_size_formats: fontSize,
  font_family_formats:fontFormat,

  lineheight_formats: '1 1.2 1.4 1.6 2 3 4 5', //行高
  placeholder: '请输入内容',

  paste_data_images: true,
  paste_as_text:false, //仅粘贴为文本，false为禁用
  paste_merge_formats: true, //合并相同的文本格式元素，true为启用
  paste_block_drop:false, //文本拖拽输入，false为允许
  paste_enable_default_filters :false, //删除粘贴内容样式，false为禁用
  paste_webkit_styles:"all", //保留所有样式
  invalid_elements : 'article',
  invalid_styles: {
    'a': 'background', // 链接禁用背景样式
  },

  autosave_ask_before_unload: false, //当关闭或跳转URL时，弹出提示框提醒用户仍未保存变更内容
  autosave_interval: "10s", //自动保存的时间间隔
  autosave_prefix: "EditorAutoSave-{path}{query}-{id}-", //自动保存的文件名前缀
  autosave_restore_when_empty:true,  //编辑器在初始化时为空时，自动还原存储在本地存储中的内容
  table_resize_bars:true,  //允许拖动列或行调整大小
  table_toolbar:'tableprops tabledelete | ' +
      'tableinsertrowbefore tableinsertrowafter tabledeleterow | ' +
      'tableinsertcolbefore tableinsertcolafter tabledeletecol | ' +
      'tablealignleft tablealigncenter tablealignright | ' +
      'table tablerowprops tablecellprops | ' +
      'tableToimg tablemergecells tablesplitcells', //表格工具栏

  charmap_append: [
    [0x2615, 'morning coffee'],
    [0x2600, 'sun'],
    [0x2601, 'cloud'],
  ], //特殊字符自定义
  imagetools_cors_hosts: ['zjweu.edu.cn','csdn.net'],
  imagetools_proxy: `/api/files/upload/image?token=${localStorage.getItem('token')}`,
  images_upload_base_path: '/',

  content_style: "p {margin: 5px 0;} img {max-width:100%;}",

  menubar: props.size === 'normal', // 菜单栏
  statusbar: true, // 是否显示底部状态栏
  auto_focus: false, // 自动聚焦

  promotion: false, // 隐藏upgrade按钮
  resize: false, // 改变宽高

  // 快速工具栏配置，需引入插件 quickbars
  quickbars_selection_toolbar: 'bold italic underline strikethrough', // 设置 快速选择 触发提供的工具栏 需引入插件  默认 'alignleft aligncenter alignright' 设置为false禁用
  quickbars_insert_toolbar: 'quickimage quicktable quicklink', // 设置 快速插入 触发提供的工具栏 需引入插件quickbars 默认 quickimage quicktable 设置为false禁用
  quickbars_image_toolbar: 'alignleft aligncenter alignright',

  save_onsavecallback: function () { console.log('editor saved!') }, //保存回调

  automatic_uploads: true, // 禁止图片自动上传

  imagetools_toolbar: 'rotateleft rotateright flipv fliph imageoptions',  //editimage暂不可用

  // 此处为自定义图片上传处理函数
  images_upload_handler: (blobInfo: any) => new Promise((resolve: any, reject: any) => {
    var xhr: XMLHttpRequest, formData;
    var file = blobInfo.blob();//转化为易于理解的file对象
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', `/api/files/upload/image?token=${localStorage.getItem('token')}`);
    xhr.onload = function() {
      var json;
      if (xhr.status !== 200) {
        ElNotification.error({title:'图片上传失败',message:xhr.statusText})
        reject('HTTP Error: ' + xhr.status)
        return;
      }
      json = JSON.parse(xhr.responseText);
      if (!json || typeof json.data.url != 'string' || json.code !== 200) {
        ElNotification.error({title:'图片上传失败',message:xhr.statusText})
        reject('Invalid JSON: ' + xhr.responseText);
        return;
      }
      resolve(json.data.url, { alt: json.data.name, width:'100%', height:'auto'});
    };
    formData = new FormData();
    formData.append('file', file, file.name );
    xhr.send(formData);
  }),
  axImages_upload_handler: function (blobInfo: any,resolve: any, reject: any){
    var xhr: XMLHttpRequest, formData;
    var file = blobInfo.blob();//转化为易于理解的file对象
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', `/api/files/upload/image?token=${localStorage.getItem('token')}`);
    xhr.onload = function() {
      var json;
      if (xhr.status !== 200) {
        ElNotification.error({title:'图片上传失败',message:xhr.statusText})
        reject('HTTP Error: ' + xhr.status)
        return;
      }
      json = JSON.parse(xhr.responseText);
      if (!json || typeof json.data.url != 'string' || json.code !== 200) {
        ElNotification.error({title:'图片上传失败',message:xhr.statusText})
        reject('Invalid JSON: ' + xhr.responseText);
        return;
      }
      resolve(json.data.url);
    };
    formData = new FormData();
    formData.append('file', file, file.name );
    xhr.send(formData);
  },
  paste_preprocess: async function(plugin: any, args: any) {
    const images = args.content.match(/<img[^>]+/g);
    let flag = false;
    console.log('所有的img标签:', images);
    if (images) {
      const promises = images.map((item: any) => {
        return new Promise((resolve, reject) => {
          const srcMatch = item.match(/src="([^"]+)"/);
          if (srcMatch) {
            const src = srcMatch[1];
            if (src.startsWith('http')) {
              flag = true;
              imageUrlTOLocal(src).then(newSrc=>{
                console.log(src,newSrc)
                args.content = args.content.replace(src, newSrc); // 替换图片链接
                resolve(args.content)
              }).catch(reject); // 捕获并拒绝Promise
            }
          } else resolve(item);
        });
      });
      await Promise.all(promises);
      console.log('finish', args.content);
      textContent.value = args.content
    }
  },
  image_caption:true, //图片标题
  image_advtab: true,  //图片样式
  lists_indent_on_tab: true, // 是否按tab键进入新的子列表
  link_context_toolbar: true,
  link_rel_list: [
    { title: '关闭追踪', value: 'noreferrer' },
    { title: '外部链接', value: 'external' }
  ],
  link_target_list: [
    { title: '当前页面', value: '_self' },
    { title: '新标签页', value: '_blank' },
  ],
  fullscreen_native: true,
  pagebreak_split_block: true,
  table_border_widths: [
    { title: 'small', value: '1px' },
    { title: 'medium', value: '3px' },
    { title: 'large', value: '5px' },
  ],
}
// 组件挂载完毕
onMounted(() => {
  tinymce.init({})
})

const imageUrlTOLocal = async (urlPath: string): Promise<string> => {
  const res = await uploadImageByURL(urlPath);
  if (!res) return urlPath;
  return res.data.url;
}
</script>

<style>
/* 在el-dialog中tinymce z-index 被太小而被遮挡时要加这两句 */
.tox-tinymce-aux{z-index:99999 !important;}
.tinymce.ui.FloatPanel{z-Index: 99;}
</style>

<style scoped>
.tox-editor-container {
  height: 80vh;
  width: 100%;
  z-index: 99999;
}
</style>
