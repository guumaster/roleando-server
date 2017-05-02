<template>
  <v-dialog v-model="editMetadata" persistent fullscreen>

    <div slot="activator">
      <slot name="activator"></slot>
    </div>

    <v-card class="black--text">
      <v-card-row>
        <v-card-title>Editar</v-card-title>
      </v-card-row>
      <v-card-row>
        <v-card-text>
          <v-container fluid>
            <v-text-field label="Nombre" required :value="name" v-model="newName"/>
            <v-text-field label="Descripcion" multi-line hint="Descripcion" :value="desc" v-model="newDesc" required/>
          </v-container>
        </v-card-text>
      </v-card-row>
      <v-card-row actions>
        <v-btn class="secondary" @click.native="cancel">Cancelar</v-btn>
        <v-btn class="red darken-1" @click.native="saveMeta">Guardar</v-btn>
      </v-card-row>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: ['name', 'desc'],
    data () {
      return {
        newName: this.name,
        newDesc: this.desc,
        editMetadata: false
      }
    },
    methods: {
      cancel () {
        this.editMetadata = false
        this.newName = this.name
        this.newDesc = this.desc
      },
      saveMeta () {
        this.editMetadata = false
        this.$emit('saveMetadata', {
          name: this.newName,
          desc: this.newDesc
        })
      }
    }
  }
</script>
