<template>
  <div class="white">
    <v-tabs id="tabs" v-model="active" grow scroll-bars @input="test">

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
    data () {
      return {active: 'tpls'}
    },
    methods: {
      test (e) {
        console.log('click', e)
      }
    }
  }
</script>
<style>
  #generator, #tpls, #tables {
    display: flex;
    flex-direction: column;
    flex: 1 1 77vh;
  }

  #generator .viewer {
    flex: 1 1 75vh;
  }

  #tpls .viewer {
    flex: 1 1 75vh;
  }
  #tabs .tabs__tabs {
    background-color: inherit;
  }

  #tabs.tabs .tab__item {
    color: inherit !important;
  }

  #tabs .tabs__items {
    border: none !important;
  }
</style>
