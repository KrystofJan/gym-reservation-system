<script setup>
import AppHeader from './components/AppHeader/AppHeader.vue';
import Footer from './components/Footer.vue'


const stickyScroll = () => {
  const navbar = document.querySelector('.NavMenu');

  if (window.scrollY > navbar.offsetTop){
      navbar.classList.add('sticky');
  }
  else{
    navbar.classList.remove('sticky');
  }
}
const toggleMenu = () => {
  console.log("esketit");
}

window.addEventListener('scroll', stickyScroll);


</script>
<template>
    <AppHeader />
    <router-view v-slot="{Component}">
      <component :is="Component"/>
    </router-view>
    <Footer />
</template>

<style scoped>

</style>
