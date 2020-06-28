  
<template>
  <div id="app">
    <h1 class="title">Library</h1>
    <Header></Header>    
    <router-view/>
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
    body {
      padding: 10px;
    }

    #app {
      height: 100vh;

    }
    </style>

