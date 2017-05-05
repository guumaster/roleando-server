<template>
  <div class="text-box">
    <v-list>
      <v-btn block class="red white--text" @click.native="add">
        <v-icon>add</v-icon> Agregar
      </v-btn>
      <template v-for="(value, key) in alias">
        <v-list-item :key="value">
          <v-list-tile avatar>

            <v-list-tile-content>
              <v-list-tile-title class="display-3"> {{key}}</v-list-tile-title>
              <v-list-tile-sub-title>Referencia: {{ value }}</v-list-tile-sub-title>

            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple @click.native="remove(key)">
                <v-icon class="red--text text--lighten-1">clear</v-icon>
              </v-btn>
            </v-list-tile-action>

          </v-list-tile>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    methods: {
      add () {
        this.$emit('add', {
          key: 'test',
          value: '123'
        })
      },
      remove (key) {
        this.$emit('remove', key)
      }
    },
    computed: {
      ...mapState('generator', {
        alias: state => state.local.data.alias
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
