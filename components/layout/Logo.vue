<template>
  <div class="logo text-xs-center">
    <img  :class="classSize" src="/images/icons/icon-512x512.png" />
  </div>
</template>
<script>
  export default {
    name: 'logo',
    props: {
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
<style scoped>
  .logo {
    /*filter: invert(100%);*/
  }
   .size-small {
     max-width: 30px;
     max-height: 30px;
   }
  .size-normal {
    max-width: 90px;
    max-height: 90px;
  }

  .size-big {
    max-width: 150px;
    max-height: 150px;
  }
</style>
