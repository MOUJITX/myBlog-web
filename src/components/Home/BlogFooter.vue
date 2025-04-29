<script setup lang="ts">
const webName = localStorage.getItem('web_name');
const web_police = localStorage.getItem('web_police');
const web_icp = localStorage.getItem('web_icp');
</script>

<template>
  <footer class="footer">
    <div>Designed by {{ webName }}</div>
    <div>
      Copyright © 2001-{{ new Date().getFullYear() }}
      <router-link to="/admin">{{ webName }}</router-link> All rights reserved.
    </div>
    <div>
      <a href="https://beian.miit.gov.cn/" target="_blank" v-if="web_icp">{{
        web_icp
      }}</a>
      <img
        src="./../../assets/gongan.png"
        style="padding-left: 10px"
        v-if="web_police" />
      <a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank">{{
        web_police
      }}</a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  width: 100%;
  height: 100px;
  background-color: #333;
  color: white;
  line-height: 25px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
