<script setup lang="ts">

</script>

<template>
  <div class="wave">
    <div class="wave-item wave1"></div>
    <div class="wave-item wave2"></div>
    <div class="wave-item wave3"></div>
  </div>
</template>

<style scoped lang="scss">
.wave{
  position: absolute;
  bottom: 0;
  height: 130px;
  width: 100%;
  overflow: hidden;
}
.wave .wave-item{
  position: absolute;
  width: 200%;
  height: 100%;
  opacity: 0.4;
}
.wave .wave1{
  top: 20px;
  left: -100%;
  opacity: 0.5;
  animation: to-right 15s infinite linear;
  mask-image: url("../../assets/waveBar.svg");
  background-color: var(--root-background-color);
}
.wave .wave2{
  top: 30px;
  left: 0;
  opacity: 0.8;
  animation: to-left 25s infinite linear;
  mask-image: url("../../assets/waveBar.svg");
  background-color: var(--root-background-color);
}
.wave .wave3{
  top: 45px;
  left: -100%;
  opacity: 1;
  animation: to-right 35s infinite linear;
  mask-image: url("../../assets/waveBar.svg");
  background-color: var(--root-background-color);
}
@keyframes to-right {
  0%{
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50%{
    transform: translateX(25%) translateZ(0) scaleY(0.7);
  }
  100%{
    transform: translateX(50%) translateZ(0) scaleY(1);
  }
}
@keyframes to-left {
  from{
    transform: translate(0%, 0px);
  }
  to {
    transform: translate(-50%, 0px);
  }
}
</style>
