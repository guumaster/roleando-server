<template>
  <div class="white elevation-0">
    <v-tabs id="tabs" grow @input="test" class="elevation-0">

      <v-tab-item href="#generator" slot="activators">Generador</v-tab-item>
      <v-tab-item href="#tpls" slot="activators">Plantilla</v-tab-item>
      <v-tab-item href="#tables" slot="activators">Tablas</v-tab-item>

      <v-tab-content id="generator" slot="content">
        <slot name="generator"></slot>
      </v-tab-content>

      <v-tab-content id="tpls" slot="content">
        <slot name="tpls"></slot>
      </v-tab-content>

      <v-tab-content id="tables" slot="content">
        <slot name="tables"></slot>
      </v-tab-content>
    </v-tabs>
  </div>
</template>
<script>
  export default {
    props: ['editionMode'],
    methods: {
      test (e) {
        console.log('click', e)
      }
    }
  }
</script>
<style>
  #tabs .tabs__tabs {
    background-color: inherit;
  }
  #tabs.tabs .tab__item {
    color: inherit!important;
  }

  #tabs .tabs__items {
    border: none!important;
  }
</style>
