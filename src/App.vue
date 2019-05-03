<template>
  <div class="corpo">

   <transition name="pagina">
     <keep-alive>
    <router-view></router-view>
  </keep-alive>
    </transition>

  </div>
</template>
<script>

import { routes }  from './routes';


export default {

 

  data() {

    return {

      routes
    }

  }

}
</script>
<style>

  .corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .3s
  }
  .pagina-enter, .pagina-leave-active {
    opacity: 0
  }
</style>