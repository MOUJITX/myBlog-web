<script setup lang="ts">
import MJTXFormButton from "@/components/publicUI/MJTXFormButton.vue";
import {defineProps, defineEmits, ref, PropType, defineModel} from "vue";
import {IArticle} from "@/api/types";
import ArticleForm from "@/components/Admin/Article/ArticleForm.vue";

const article = defineModel<IArticle>()

const props = defineProps({
  buttonTitle:{
    type: String,
    default: '发布设置'
  },
  buttonSize:{
    type: String as PropType<"large" | "default" | "small">,
    default: 'large'
  },
  link:{
    type: Boolean,
    default: false
  },
  type:{
    type: String as PropType<"primary" | "success" | "warning" | "danger" | "info" | "text">,
    default: 'info'
  },
})

const emit = defineEmits(['popup-close'])

const popupVisible = ref(false)
const handleClose = () => {
  popupVisible.value = false
  emit('popup-close')
}
</script>

<template>
  <MJTXFormButton
      :type="props.type"
      :link="props.link"
      form="drawer"
      :button-title="props.buttonTitle!"
      form-title="发布设置"
      :button-size="props.buttonSize"
      size="30%"
      v-model="popupVisible" >
    <ArticleForm v-model="article" @handle-close="handleClose()"/>
  </MJTXFormButton>
</template>

<style scoped lang="scss">

</style>
