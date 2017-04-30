<template>
  <nuxt-link :to="{ name: route }">
    <v-card horizontal class=" mb-3">

      <v-card-row :img="img" height="250px"></v-card-row>
      <v-card-column>
        <v-card-row class="blue-grey lighten-3 ">
          <v-card-text>
            <h4 class="black--text">
              <slot name="title"></slot>
            </h4>
            <div class="white--text">
              <slot name="desc"></slot>
            </div>
          </v-card-text>
        </v-card-row>
        <v-card-row actions class="blue-grey lighten-2">
          <v-btn flat class="white--text">
            <v-icon left>keyboard_arrow_right</v-icon>
            Abrir
          </v-btn>
        </v-card-row>
      </v-card-column>
  </v-card>
  </nuxt-link>
</template>
<script>
  export default {
    name: 'home-card',
    props: ['img', 'route']
  }
</script>
