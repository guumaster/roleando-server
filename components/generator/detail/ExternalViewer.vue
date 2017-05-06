<template>
  <div class="text-box">
    <v-list>
      <v-expansion-panel expand>
        <v-expansion-panel-content  v-model="open">
          <div slot="header" >Tabla nueva</div>
          <v-card>
            <v-card-row>
              <v-card-title>
                <v-text-field
                  v-model="newTableName"
                name="new-table-name"
                label="Alias"
              ></v-text-field>
              </v-card-title>
            </v-card-row>
            <v-card-row>
            <v-card-text >
              <v-select
                label="Generadores"
                :items="tables"
                v-model="newTable"
                item-text="name"
                item-value="id"
                light
                max-height="auto"
                autocomplete
              >
              </v-select>
            </v-card-text>
            </v-card-row>
            <v-card-row actions>
              <v-btn class="secondary" @click.native="cancelAdd">Cancelar</v-btn>
              <v-btn class="red darken-1" @click.native="add">Ok</v-btn>
            </v-card-row>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
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
  import {mapState, mapActions} from 'vuex'

  export default {
    data () {
      return {
        open: false,
        newTable: {},
        newTableName: ''
      }
    },
    watch: {
      open (next, prev) {
        if (next && !prev) {
          this.loadNames()
        }
      }
    },
    methods: {
      ...mapActions('generator', ['loadExternal', 'loadNames']),
      cancelAdd () {
        this.open = false
      },
      async add () {
        await this.loadExternal({
          id: this.newTable.id,
          name: this.newTableName
        })
        this.$emit('add')
        this.newTable = {}
        this.newTableName = ''
        this.open = false
      },
      remove (key) {
        this.$emit('remove', key)
      }
    },
    computed: {
      ...mapState('generator', {
        alias: state => state.local.data.alias,
        tables: state => state.names
      })
    }
  }
</script>
