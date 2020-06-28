  
<template>
  <blog-back-ground>
    <div id="app">

      <blog-layout>
          <div slot="navbar">      
            <Header></Header>    
          </div>
          <div slot="section"><router-view/> </div> 
      </blog-layout>
      
    </div>
  </blog-back-ground>
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
    body {
      padding: 10px;
    }

    #app {
      height: 100vh;

    }
    </style>

