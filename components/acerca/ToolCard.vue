<template>
  <v-card class="mb-4">
    <v-card-title class="indigo lighten-1 black--text tool-card--header">
      <slot name="title"></slot>
    </v-card-title>
    <v-card-text>
      <slot name="content"></slot>
    </v-card-text>
    <v-card-row actions  v-if="linkTo">
      <a target="_blank" :href="linkTo">
        <v-btn outline flat class="indigo--text darken-1">Ver</v-btn>
      </a>
    </v-card-row>
  </v-card>
</template>
<script>
  export default {
    props: ['linkTo'],
  }
</script>
<style scoped>
  .tool-card--header {
    height: 1.5em;
  }
</style>
