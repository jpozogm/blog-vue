  
<template>
  <div class="main">
    <blog-back-ground>
      <div id="app">
        <blog-layout>
          <div slot="navbar">      
            <Header></Header>    
          </div>
          <div slot="section"><router-view/> </div> 
        </blog-layout>

        <blog-footer 
          heading=" All Rights Reserved by Generación-K &copy;" 
          content="Blog made with Angular">
        </blog-footer>
      </div>
    </blog-back-ground>
  </div>
</template>

<script>
import Header from './components/shared/header/Header';


export default {
  name: 'app',
  components: {
    Header,
  },
}
</script>

<style>

.main{
}
  body {
    padding: 10px;
  }

  #app {
    height: 100vh;
    overflow-x: hidden;
  }
</style>

