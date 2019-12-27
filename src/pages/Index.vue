<template>
<div class="class-name">
  测试{{name}}
  <div>
    <!-- <ts-test text="Hello TypeScript" /> -->
  </div>
</div>
</template>
<script>

import { BASE_API } from '../utils'
// import TsTest from './TsTest.vue'
import axios from 'axios'
export default {
  data () {
    return {
      name: '这是Index 页面'
    }
  },
  methods: {
    getCustomerList () {
      const url = BASE_API + '/user/get/customer/list'
      axios.get(url).then(res => {
      }).catch(e => {
      })
    }
  },
  created () {
    // this.getCustomerList()
  }
}
</script>
