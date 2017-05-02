<template>
  <div class="text-box">
    <textarea class="box" @change="changed">{{tpls}}</textarea>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    methods: {
      changed (e) {
        this.$emit('update', e.target.value)
      }
    },
    computed: {
      ...mapState('generator', {
        tpls: state => state.local.data.tpls
      })
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
