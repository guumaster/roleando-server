<template>
        <img :class="classSize" class="item-primary avatar shadow-2" :src="src"/>
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
        width: 30px;
        max-width: 30px;
        max-height: 30px;
    }
    .size-normal {
        max-width: 50px;
        max-height: 50px;
    }

</style>
