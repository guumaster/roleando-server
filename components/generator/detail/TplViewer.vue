<template>
  <div class="text-box">
    <textarea class="box">{{generator.data.tpls}}</textarea>
    <!--<v-text-field-->
    <!--name="input-tpls"-->
    <!--class="box"-->
    <!--focus-->
    <!--label="Plantilla"-->
    <!--:value="generator.data.tpls"-->
    <!--multi-line-->
    <!--&gt;</v-text-field>-->
  </div>
</template>
<script>
  export default {
    props: ['generator'],
    data () {
      return {tpls: ''}
    }
  }
</script>
<style scoped>
  .text-box {
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    height: 68vh;
  }

  .box {
    background-color: #CCC !important;
    flex: 1 1 100% !important; /* consume available width */
    overflow-y: auto !important;
  }
</style>
