<script setup lang="ts">
  import CategoryForm from '@/components/Admin/Category/CategoryForm.vue';
  import MJTXFormButton from '@/components/publicUI/MJTXFormButton.vue';
  import { defineProps, defineEmits, ref, PropType } from 'vue';
  import { Action } from '@/api/types';
  const props = defineProps({
    uuid: {
      type: String,
    },
    action: {
      type: String as PropType<'insert' | 'update' | 'copy'>,
      required: true,
    },
    currentUUID: {
      type: String,
      required: true,
    },
    link: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['popup-close']);

  const popupVisible = ref(false);
  const handleClose = () => {
    popupVisible.value = false;
    emit('popup-close');
  };
</script>

<template>
  <MJTXFormButton
    type="primary"
    :link="!!props.uuid || props.link"
    form="dialog"
    :button-title="Action[props.action]"
    :form-title="Action[props.action]"
    :disabled="props.currentUUID === 'root'"
    v-model="popupVisible">
    <CategoryForm
      @handle-close="handleClose()"
      :uuid="props.uuid"
      :action="props.action"
      :currentUUID="currentUUID" />
  </MJTXFormButton>
</template>

<style scoped lang="scss"></style>
