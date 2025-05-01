<script setup lang="ts">
  import TagForm from '@/components/Admin/Tag/TagForm.vue';
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
    :link="!!props.uuid"
    form="dialog"
    :button-title="Action[props.action]"
    :form-title="Action[props.action]"
    v-model="popupVisible">
    <TagForm
      @handle-close="handleClose()"
      :uuid="props.uuid"
      :action="props.action" />
  </MJTXFormButton>
</template>

<style scoped lang="scss"></style>
