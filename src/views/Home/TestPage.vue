<script setup>
const content = document.querySelector('#content');
const contentBlocks = document.querySelectorAll('.content-block');
const navItems = document.querySelectorAll('.nav-item');
const nav = document.querySelector('#nav');

let timerId = null;
let currentBlockIndex = 0;
navItems[currentBlockIndex].classList.add('active');

const handleScroll = function () {
  for (let i = 0; i < contentBlocks.length; i++) {
    const block = contentBlocks[i];
    if (
      block.offsetTop <= content.scrollTop &&
      block.offsetTop + block.offsetHeight > content.scrollTop
    ) {
      currentBlockIndex = i;
      break;
    }
  }
  for (let i = 0; i < navItems.length; i++) {
    const item = navItems[i];
    item.classList.remove('active');
  }
  navItems[currentBlockIndex].classList.add('active');
};

nav.addEventListener('click', e => {
  if (timerId) {
    window.clearInterval(timerId);
  }
  content.removeEventListener('scroll', handleScroll);
  let lastScrollPosition = content.scrollTop;

  timerId = window.setInterval(() => {
    const currentScrollPosition = content.scrollTop;
    console.log(currentScrollPosition, lastScrollPosition);
    if (lastScrollPosition === currentScrollPosition) {
      content.addEventListener('scroll', handleScroll);
      window.clearInterval(timerId);
    }
    lastScrollPosition = currentScrollPosition;
  }, 150);

  navItems.forEach((item, index) => {
    navItems[index].classList.remove('active');
    if (e.target === item) {
      navItems[index].classList.add('active');
      content.scrollTo({
        top: contentBlocks[index].offsetTop,
        behavior: 'smooth',
      });
    }
  });
});

content.addEventListener('scroll', handleScroll);
</script>

<template>
  <div class="container">
    <div id="nav">
      <div class="nav-item">目录 1</div>
      <div class="nav-item">目录 2</div>
      <div class="nav-item">目录 3</div>
      <div class="nav-item">目录 4</div>
      <div class="nav-item">目录 5</div>
      <div class="nav-item">目录 6</div>
    </div>
    <div id="content">
      <div class="content-block">内容 1</div>
      <div class="content-block">内容 2</div>
      <div class="content-block">内容 3</div>
      <div class="content-block">内容 4</div>
      <div class="content-block">内容 5</div>
      <div class="content-block">内容 6</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
}
#nav {
  width: 150px;
  height: 400px;
  background-color: #eee;
}
#nav .nav-item {
  cursor: pointer;
}
#nav .nav-item.active {
  font-weight: bold;
  background-color: #f60;
}
#content {
  flex: 1;
  margin-left: 10px;
  position: relative;
  width: 300px;
  height: 400px;
  overflow-y: scroll;
}
.content-block {
  margin-top: 25px;
  height: 200px;
  background-color: #eee;
}

.content-block:first-child {
  margin-top: 0;
}
</style>
