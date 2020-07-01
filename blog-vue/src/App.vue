  
<template>
  <div class="main">
    <ErrorMessages></ErrorMessages>
    
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
import ErrorMessages from './components/shared/error-messages/ErrorMessages';

export default {
  name: 'app',
  components: {
    Header,
    ErrorMessages,
  },
}
</script>

<style>

  .flex{
    display: flex;
  }

  .flex__between{
    display: flex;
    justify-content: space-between;
  }

  .flex__center{
    display: flex;
    justify-content: center;
  }

  .flex__column{
    display: flex;
    flex-direction: column;
  }
  
  body {
    padding: 10px;
  }

  #app {
    height: 100vh;
    overflow-x: hidden;
  }
</style>

