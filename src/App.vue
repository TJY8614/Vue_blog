<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import utils from './lib/utils'
import  './assets/css/base.css'
import  './assets/css/normalize.css'
export default {
  name: 'App',
  mounted () {
    window.onscroll = function(e) {
      if(utils.isScrollBottom()) {
        console.log("bottom");
      }
    }
  }
}
</script>

<style scoped>

</style>
