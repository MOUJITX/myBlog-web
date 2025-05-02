import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/Home/HomePage.vue';
import AboutPage from '@/views/Home/AboutPage.vue';
import ArticlePage from '@/views/Home/ArticlePage.vue';
import ListPage from '@/views/Home/ListPage.vue';
import ArchivePage from '@/views/Home/ArchivePage.vue';
import ResumePage from '@/views/Home/ResumePage.vue';
import PhotoPage from '@/views/Home/PhotoPage.vue';
import PhotoListPage from '@/views/Home/PhotoListPage.vue';
// import TestPage from '@/views/Home/TestPage.vue';

import HomeLayout from '@/views/Layout/HomeLayout.vue';
import AdminLayout from '@/views/Layout/AdminLayout.vue';

import AdminIndexPage from '@/views/Admin/IndexPage.vue';
import AdminArticlePage from '@/views/Admin/ArticlePage.vue';
import AdminCategoryPage from '@/views/Admin/CategoryPage.vue';
import AdminTagPage from '@/views/Admin/TagPage.vue';
import AdminSettingPage from '@/views/Admin/SettingPage.vue';
import AdminResumePage from '@/views/Admin/ResumePage.vue';
import AdminPhotoPage from '@/views/Admin/PhotoPage.vue';
import AdminFilePage from '@/views/Admin/FilePage.vue';
import AdminImagePage from '@/views/Admin/ImagePage.vue';
import AdminUIPage from '@/views/Admin/UIPage.vue';
import LoginPage from '@/views/Admin/LoginPage.vue';
import EditPage from '@/views/Admin/EditPage.vue';
import SearchPage from '@/views/Home/SearchPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeLayout',
    component: HomeLayout,
    redirect: '/home',
    children: [
      { path: 'home', name: 'home', component: HomePage },
      { path: 'about', name: 'about', component: AboutPage },
      { path: 'article/:uuid', name: 'article', component: ArticlePage },
      { path: 'archive', name: 'archive', component: ArchivePage },
      { path: 'resume', name: 'resume', component: ResumePage },
      { path: 'photo', name: 'photoList', component: PhotoListPage },
      { path: 'photo/:uuid', name: 'photo', component: PhotoPage },
      // { path: 'test', name: 'test', component: TestPage },
      { path: 'list/:type/:title', name: 'list', component: ListPage },
      { path: 'search/:search', name: 'search', component: SearchPage },
      { path: ':pathMatch(.*)*', name: 'empty', component: HomePage },
    ],
  },
  { path: '/admin/login', name: 'AdminLogin', component: LoginPage },
  {
    path: '/admin/',
    name: 'AdminLayout',
    component: AdminLayout,
    redirect: '/admin/index',
    children: [
      { path: 'index', name: 'adminIndex', component: AdminIndexPage },
      { path: 'article', name: 'adminArticle', component: AdminArticlePage },
      {
        path: 'edit/:action/:uuid/:path',
        name: 'adminEdit',
        component: EditPage,
      },
      { path: 'category', name: 'adminCategory', component: AdminCategoryPage },
      { path: 'tag', name: 'adminTag', component: AdminTagPage },
      { path: 'file', name: 'adminFile', component: AdminFilePage },
      { path: 'image', name: 'adminImage', component: AdminImagePage },
      { path: 'setting', name: 'adminSetting', component: AdminSettingPage },
      { path: 'resume', name: 'adminResume', component: AdminResumePage },
      { path: 'photo', name: 'adminPhoto', component: AdminPhotoPage },
      { path: 'ui', name: 'adminUI', component: AdminUIPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
