<template>
  <div>
    <v-card horizontal class="secondary white--text elevation-0">
      <v-card-row class="text-xs-right menubox-container">
        <div class="menubox">
          <v-btn small icon @click.native="expand = !expand">
            <v-icon v-if="!expand">keyboard_arrow_right</v-icon>
            <v-icon v-if="expand">keyboard_arrow_down</v-icon>
          </v-btn>
        </div>
      </v-card-row>

      <v-card-row class="text-xs-left text--white title">
        <v-card-text>
          {{generator.name}}
        </v-card-text>
      </v-card-row>
      <v-spacer></v-spacer>
      <v-card-row class="text-xs-right menubox-container">
        <div class="menubox">
          <v-btn red small icon @click.native="$emit('edit')">
            <icon name="pencil"></icon>
          </v-btn>
        </div>
      </v-card-row>
    </v-card>

    <v-card v-show="expand">
      <v-card-column class="white">
        <v-card-row>
          <v-card-text class="text-xs-left">
            <p class="desc">{{generator.desc}}</p>
          </v-card-text>
        </v-card-row>
      </v-card-column>
    </v-card>
  </div>
</template>
<script>
  export default {
    props: ['generator'],
    data () {
      return {
        expand: false
      }
    }
  }
</script>
<style scoped>
  .menubox {
    margin: 0;
    display: flex;
    flex-direction: row;
  }

  .menubox-container {
    margin: 0;
    flex-basis: 5%;
    text-align: right;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    flex-basis: 90%;
    flex-grow: 1;

  }

  .title .card__text {
    /*padding: 0;*/
    padding-left: 0.2em;
  }
</style>
