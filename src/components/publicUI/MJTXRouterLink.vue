<script setup lang="ts">
import {defineProps, PropType, watch} from 'vue'
const props = defineProps({
  to:{
    type: String,
    required: true
  },
  target:{
    type: String as PropType<'_blank' | '_self'>
  }
})

const jumpTo = (url: string) => {
  window.open(url,'_blank')
}

let is_jump = props.to?.startsWith('http')
watch(() => props.to, (newVal) => {
  is_jump = newVal?.startsWith('http')
})
</script>

<template>
  <router-link :to="props.to" :target="props.target ? props.target : '_self'" v-if="!is_jump"><slot /></router-link>
  <router-link to="" @click="jumpTo(props.to!)" :target="props.target ? props.target : '_blank'" v-else><slot /></router-link>
</template>

<style scoped lang="scss">

</style>
