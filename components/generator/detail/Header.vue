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

          <edit-metadata
            v-if="metaBtn"
            :name="generator.name"
            :desc="generator.desc"
            @saveMetadata="saveMetadata">
            <v-btn slot="activator" class="grey" small icon>
              <icon name="pencil"></icon>
            </v-btn>
          </edit-metadata>

        </v-card-text>
      </v-card-row>
      <v-spacer></v-spacer>

      <v-card-row class="text-xs-right menubox-container">
        <div class="menubox">

          <delete-dialog
            v-if="deleteBtn"
            title="Borrar generador?"
            description="Esta accion borrará el generador de forma permanente. No se puede deshacer."
            width="50%"
            @confirm="$emit('delete')">
            <v-btn slot="activator" small icon class="red--text">
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </delete-dialog>

          <v-btn v-show="saveBtn"
                 small icon @click.native="$emit('save')" class="blue--text">
            <v-icon>system_update_alt</v-icon>
          </v-btn>

          <v-btn red small icon @click.native="$emit('edit')">
            <icon v-if="editionMode" name="eye-slash"></icon>
            <icon v-if="!editionMode" name="eye"></icon>
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
  import DeleteDialog from '../../common/DeleteDialog.vue'
  import EditMetadata from './EditMetadata.vue'
  import { mapState, mapGetters } from 'vuex'

  export default {
    props: ['editionMode'],
    components: {DeleteDialog, EditMetadata},
    computed: {
      ...mapGetters('generator', ['canEdit']),
      ...mapState('generator', {
        generator: 'local'
      }),
      metaBtn () {
        if (this.editionMode || !this.isLogged) return false

        return this.isNew && this.canEdit
      },
      saveBtn () {
        if (this.editionMode || !this.isLogged) return false

        return this.isNew && this.canEdit
      },
      deleteBtn () {
        if (this.editionMode || !this.isLogged) return false

        return !this.isNew && this.canEdit
      }
    },
    data () {
      return {
        expand: false
      }
    },
    methods: {
      saveMetadata (payload) {
        this.$emit('saveMetadata', payload)
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
    padding-left: 0.2em;
  }
</style>
