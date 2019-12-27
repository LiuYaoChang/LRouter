<template>
  <div id="app">

    <h1>Vue 嵌入 TypeScript</h1>
    {{name}}
    <!-- <router-link to="/">Index</router-link>
    <router-link to="/detail">Detail</router-link> -->
    <l-router-link to="/">Index</l-router-link>
    <l-router-link to="/detail">Detail</l-router-link>
    <!-- <img src="./assets/logo.png">
    <HelloWorld/> -->
    <h1>视图</h1>
    <l-router-view></l-router-view>
    <!-- <router-view></router-view> -->
    <!-- <customer-form></customer-form> -->

    <test text="这是测试TS的组件"></test>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  data () {
    return {
      name: 'APP'
    }
  }
}
// import { name } from './lib/LRouter/index.ts'
// import HelloWorld from './components/HelloWorld'
// import { BASE_API } from './utils'
// import { Vue, Component } from 'vue-property-decorator'
// import CustomerForm from './components/CustomerForm'
// import Test from './pages/Test.vue'
// @Component({
//   components: {
//     Test
//   }
// })
// export default class App extends Vue {
//   name: string = 'Hello Ts1';
//   test: string = '';
// }
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
