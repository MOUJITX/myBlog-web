<script setup lang="ts">
  import { defineModel, onBeforeUnmount, ref, shallowRef } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { ElNotification } from 'element-plus';
  // // API 引用
  // import FileAPI from "@/api/file";

  const modelValue = defineModel<string>();

  const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef
  const mode = ref('default'); // 编辑器模式
  const toolbarConfig = ref({
    // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
    excludeKeys: [
      'codeBlock',
      'blockquote',
      'headerSelect',
      'redo',
      'undo',
      'bulletedList',
      'numberedList',
      'group-video',
      'fullScreen',
      'insertTable',
    ],
  }); // 工具条配置
  // 编辑器配置
  const editorConfig = ref({
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        server: '/api/files/upload/image',
        allowedFileTypes: ['image/*'],
        fieldName: 'file',
        maxFileSize: 50 * 1024 * 1024, // 20M
        headers: {
          token: localStorage.getItem('token'),
        },
        customInsert(
          res: { code: number; data: { url: string; name: string } },
          insertFn: (arg0: string, arg1: string, arg2: string) => void,
        ) {
          if (res.code === 200)
            insertFn(res.data.url, res.data.name, res.data.url);
          else ElNotification.error({ title: '图片上传失败' });
        },
      },
      // uploadVideo : {
      //   server: '/api/file/videoUpload',
      //   allowedFileTypes: ['video/*'],
      //   fieldName: 'file',
      //   maxFileSize: 100 * 1024 * 1024, // 20M
      //   headers: {
      //     token: JSON.parse(localStorage.getItem('UserInfo')).token
      //   },
      //   customInsert(res, insertFn) {
      //     if (res.code === '200') {
      //       insertFn(res.data.url)
      //     }
      //   },
      // }
    },
  });

  const handleCreated = (editor: { getAllMenuKeys: () => any }) => {
    editorRef.value = editor; // 记录 editor 实例，重要！

    console.log(editor.getAllMenuKeys());
  };

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });
</script>

<template>
  <div class="editor-wrapper">
    <!-- 工具栏 -->
    <Toolbar
      id="toolbar-container"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode" />
    <!-- 编辑器 -->
    <Editor
      id="editor-container"
      v-model="modelValue"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated" />
  </div>
</template>

<style src="@wangeditor/editor/dist/css/style.css"></style>

<style lang="scss" scoped>
  .editor-wrapper {
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
    z-index: 99999;

    &:focus {
      border: 1px solid var(--el-color-primary);
    }
  }
</style>
