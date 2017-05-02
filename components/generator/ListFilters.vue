<template>
  <div class="text-xs-right">
    <v-btn class="red" @click.native="newGenerator">
      <v-icon >add</v-icon>Nuevo
    </v-btn>
  </div>
</template>
<script>
  export default {

    methods: {
      newGenerator () {
        this.$router.push({
          name: 'generadores-nuevo'
        })
      }
    }
  }
</script>
