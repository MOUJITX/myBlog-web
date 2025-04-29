<script setup lang="ts">
import { defineProps, PropType, defineExpose, defineEmits } from 'vue';
import { isMobile } from '@/utils/isMobile';
import { defineModel } from 'vue/dist/vue';
const props = defineProps({
  type: {
    type: String as PropType<
      'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
    >,
  },
  form: {
    type: String as PropType<'dialog' | 'drawer' | 'page' | 'tab'>,
    required: true,
  },
  routerPath: {
    type: String,
    default: '#',
  },
  drawerDirection: {
    type: String as PropType<'ltr' | 'rtl' | 'ttb' | 'btt'>,
    default: 'rtl',
  },
  buttonTitle: {
    type: String,
  },
  formTitle: {
    type: String,
  },
  size: {
    type: String,
    default: isMobile() ? '100%' : '50%',
  },
  link: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  buttonSize: {
    type: String as PropType<'large' | 'default' | 'small'>,
  },
});

const formVisible = defineModel({ default: false });

const popupForm = ['dialog', 'drawer'];

defineExpose({
  formVisible,
});

const emit = defineEmits(['popup-close']);
const handleClose = () => {
  formVisible.value = false;
  emit('popup-close');
};
</script>

<template>
  <el-button
    :type="props.type"
    @click="formVisible = true"
    v-if="popupForm.includes(props.form)"
    :link="props.link"
    :disabled="props.disabled"
    :size="props.buttonSize">
    {{ props.buttonTitle }}
  </el-button>
  <router-link
    :to="props.routerPath"
    :target="props.form === 'page' ? '_self' : '_blank'"
    v-else>
    <el-button
      :type="props.type"
      class="formButton"
      :link="props.link"
      :disabled="props.disabled"
      :size="props.buttonSize"
      >{{ props.buttonTitle }}</el-button
    >
  </router-link>
  <el-dialog
    append-to-body
    class="form-popup"
    v-model="formVisible"
    :title="props.formTitle"
    :width="props.size"
    draggable
    overflow
    destroy-on-close
    @close="handleClose"
    v-if="props.form === 'dialog'">
    <template #default>
      <div class="form-popup">
        <slot />
      </div>
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
  <el-drawer
    append-to-body
    v-model="formVisible"
    :title="props.formTitle"
    :size="props.size"
    :direction="props.drawerDirection"
    show-close
    @close="handleClose"
    v-if="props.form === 'drawer'">
    <template #default>
      <div class="form-popup">
        <slot />
      </div>
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.formButton {
  margin-right: 12px;
}
.form-popup {
  margin: 20px;
}
</style>
