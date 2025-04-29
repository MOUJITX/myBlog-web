<template>
  <router-view />
</template>

<style lang="scss">
:root {
  //--root-background-color: white;
  --root-background-color: #f1f2f3;

  --max-width: 1280px;
  --min-height: calc(100vh - 565px);

  --banner-height-home: 700px;
  --banner-height-page: 400px;

  --card-margin: 10px;
  --card-padding: 20px;
  --card-border-radius: 5px;

  --box-shadow: #ccc 0 0 5px;
  --box-shadow-hover: #333 0 0 5px;

  --font-size-small: 12px;
  --font-size-medium: 16px;
  --font-size-large: 20px;
  --font-size-xlarge: 24px;

  --color-black: #181818;
  --color-whitegray: #f4f4f4;
  --color-darkgray: #666;
  --color-lightgrey: #999;

  --text-shadow: var(--color-black) 3px 3px 10px;

  --border-gray: 1px dashed #cdd0d6;

  --admin-navbar-logo-background: #2b2f3a;
  --admin-navbar-menu-background: #304156;
  --admin-navbar-menu-background-hover: #001528;
  --admin-navbar-text-color: #bfcbd9;
  --admin-navbar-text-color-hover: #ffd04b;
}

body {
  position: relative;
  background-color: var(--root-background-color);

  .el-drawer__header {
    padding-bottom: 10px;
    //border-bottom: 1px solid #ccc;
  }

  .el-upload--picture-card {
    width: 100px;
    height: 100px;
  }
}
body::-webkit-scrollbar {
  width: 6px;
}
body::-webkit-scrollbar-thumb {
  background-color: #ddd;
}

* {
  margin: 0;
  padding: 0;
  //overflow-x: hidden;
  //overflow-y: hidden;
  transition: all 0.2s; //实现背景和文字渐变
  -webkit-transition: all 0.2s; //实现背景和文字渐变

  a {
    text-decoration: none;
    color: inherit;
  }

  tbody {
    overflow-y: hidden;

    .el-icon {
      margin: 0 3px;
    }
  }

  article {
    line-height: 2;
    padding: 30px 50px;
    img {
      max-width: 100%;
      height: 100%;
    }
    figure figcaption {
      color: #999;
      display: block;
      margin-top: 0.25rem;
      text-align: center;
    }
    code {
      border-radius: 5px;
      background-color: #fff5f5;
      color: #ff502c;
      padding: 2px 5px;
      margin: 0 4px;
      font-family: 'Cascadia Mono', 'Noto Sans SC', sans-serif;
      white-space: break-spaces;
    }

    blockquote {
      color: grey;
      margin: 10px 0 10px 20px;
      padding: 10px 10px 10px 15px;
      border-left: 3px solid #03a9f4;
      background-color: #ecf7fe;
    }

    a {
      color: var(--el-color-primary);
      &:before {
        content: '🔗';
      }
      &:hover {
        padding-bottom: 2px;
        border-bottom: 1px var(--el-color-primary) solid;
      }
    }
    p {
      margin: 5px 0;
    }

    ul {
      margin: 16px 0;
      padding-left: 40px;
    }
    ol {
      margin: 16px 0;
      padding-left: 40px;
    }

    h1 {
      border-bottom: 1px solid #ccc;
      margin: 20px 0;

      //&:before{
      //  content: '#';
      //}
    }
    h2 {
      margin: 20px 0;
    }
    h3 {
      margin: 20px 0;
    }
    h4 {
      margin: 20px 0;
    }
    h5 {
      margin: 20px 0;
    }
    figcaption {
      font-size: 13px;
    }
  }
}
</style>
<script setup lang="ts"></script>
