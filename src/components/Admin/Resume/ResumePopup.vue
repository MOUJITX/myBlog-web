<script setup lang="ts">

import MJTXFormButton from "@/components/publicUI/MJTXFormButton.vue";
import {defineProps, defineEmits, ref, PropType} from "vue";
import {Action} from "@/api/types";
import ResumeForm from "@/components/Admin/Resume/ResumeForm.vue";
const props = defineProps({
  uuid: {
    type: String,
  },
  action:{
    type: String as PropType<'insert' | 'update' | 'copy'>,
    required: true,
  }
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
      type="primary"
      :link="!!props.uuid"
      form="dialog"
      size="80%"
      :button-title="Action[props.action]"
      :form-title="Action[props.action]"
      v-model="popupVisible" >
    <ResumeForm @handle-close="handleClose()" :uuid="props.uuid" :action="props.action!"/>
  </MJTXFormButton>
</template>

<style scoped lang="scss">

</style>
