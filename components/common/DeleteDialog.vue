<template>
  <div>
    <v-dialog v-model="deleteDialog" persistent>

      <div slot="activator">
        <slot name="activator"></slot>
      </div>

      <v-card class="black--text">
        <v-card-row>
          <v-card-title>{{title}}</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>{{description}}</v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="secondary" @click.native="deleteDialog=false">Cancelar</v-btn>
          <v-btn class="red darken-1" @click.native="confirm">Borrar</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    props: ['title', 'description'],
    data () {
      return {
        deleteDialog: false
      }
    },
    methods: {
      confirm () {
        this.deleteDialog = false
        this.$emit('confirm')
      }
    }
  }
</script>
