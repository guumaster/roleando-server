<template>
  <v-card horizontal class="mb-2 elevation-4">
    <v-card-column class="white">
      <v-card-row>
        <v-spacer></v-spacer>
        <v-card-text class="text-xs-left">
          <slot name="button"></slot>
          <h4>{{generator.name}}</h4>
          <p class="desc">{{generator.desc}}</p>
        </v-card-text>
      </v-card-row>
    </v-card-column>
  </v-card>
</template>
<script>
  export default {
    props: ['generator']
  }
</script>
