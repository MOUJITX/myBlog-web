<script setup lang="ts">
  const func_notice = localStorage.getItem('func_notice');
</script>

<template>
  <div v-html="func_notice"></div>
</template>

<style scoped lang="scss"></style>
