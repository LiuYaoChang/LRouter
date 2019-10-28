<template>
  <div id="app">

    <h1>这是首页</h1>
    {{name}}

    <l-router-link to="/">Index</l-router-link>
    <l-router-link to="/detail">Detail</l-router-link>
    <!-- <img src="./assets/logo.png">
    <HelloWorld/> -->
    <h1>视图</h1>
    <l-router-view></l-router-view>
  </div>
</template>

<script>
// import { name } from './lib/LRouter/index.ts'
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      test: name,
      name: 'test'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
