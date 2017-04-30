<template>
  <div class="avatar ma-1">
    <img :class="classSize" class="elevation-2" :src="src"/>
  </div>
</template>
<script>
  export default {
    props: {
      src: {
        type: String
      },
      size: {
        type: String,
        default: 'normal'
      }
    },
    computed: {
      classSize () {
        return `size-${this.size.trim().toLowerCase()}`
      }
    }
  }
</script>
<style>
  .size-small {
    width: 30px !important;
    height: 30px !important;
    max-width: 30px !important;
    max-height: 30px !important;
  }

  .size-normal {
    width: 50px !important;
    height: 50px !important;
    max-width: 50px !important;
    max-height: 50px !important;
  }

</style>
