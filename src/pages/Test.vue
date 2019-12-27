<template>
<div class="vue-typescript-in-action">
  {{text}}
</div>
</template>
<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component({
    name: 'Test'
  })
  export default class TsTest extends Vue {
    name: string = 'Test';
    @Prop() readonly text!: string;

    constructor() {
      super()
      this.text = ''
    }

  }
</script>
