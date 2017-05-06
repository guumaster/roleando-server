<template>
  <div class="text-box">
    <div class="box">
      <quill-editor
        class="tpl-container"
        ref="quillEditor"
        :content="rawTpls"
        :options="editorOption"
        @change="onEditorChange($event)"
        @ready="onEditorReady($event)">
        <div id="toolbar" slot="toolbar">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <!--<button class="ql-blockquote"></button>-->
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
          <button class="ql-indent" value="+1"></button>
          <button class="ql-indent" value="-1"></button>
          <select class="ql-size">
            <option value="small"></option>
            <option selected></option>
            <option value="large"></option>
          </select>
          <!-- <select class="ql-header">
             <option value="2"></option>
             <option value="3"></option>
             <option selected></option>
           </select>-->
          <button class="ql-link"></button>
          <button @click="addHr">
            <icon name="minus"></icon>
          </button>
          <button class="ql-clean"></button>

          <v-dialog fullscreen v-model="helpDialog">
            <button slot="activator">
              <icon name="question"></icon>
            </button>
            <v-card>
              <v-card-title>Ayuda</v-card-title>
              <v-divider></v-divider>
              <v-card-row>
                <help/>
              </v-card-row>
              <v-divider></v-divider>
              <v-card-row actions>
                <v-btn class="red darken-1" @click.native="helpDialog=false">
                  <icon name="check"></icon>
                </v-btn>
              </v-card-row>
            </v-card>
          </v-dialog>

          <v-dialog v-model="tableSelector" scrollable persistent width="90vw">
            <button slot="activator" @click="showTableSelector">
              <icon name="table"></icon>
            </button>
            <v-card>
              <v-card-title>Elige una tabla</v-card-title>
              <v-divider></v-divider>
              <v-card-row height="50vh">
                <v-card-text class="small">
                  <v-radio v-for="(item, i) in tableNames" light
                           v-model="selectedTable"
                           :label="item"
                           :value="item"
                           :key="i"
                  >{{item}}
                  </v-radio>
                </v-card-text>
              </v-card-row>
              <v-card-row actions>
                <v-btn class="secondary" small @click.native="tableSelector=false">
                  <icon name="times"></icon>
                </v-btn>
                <v-btn class="red darken-1" @click.native="insertTable">
                  <icon name="check"></icon>
                </v-btn>
              </v-card-row>
            </v-card>
          </v-dialog>
        </div>
      </quill-editor>

    </div>
  </div>
</template>
<script>
  import Help from './Help.vue'
  import {mapState} from 'vuex'

  export default {
    components: {Help},
    data () {
      return {
        range: null,
        rawTpls: '',
        selectedTable: null,
        tableSelector: false,
        helpDialog: false,
        editorOption: {
          modules: {
            toolbar: '#toolbar',
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            }
          }
        }
      }
    },
    methods: {
      showTableSelector () {
        this.range = this.editor.getSelection()
      },
      addHr () {
        const range = this.editor.getSelection()
        if (range) {
          this.editor.insertEmbed(range.index, 'divider', '', 'user')
        }
      },
      insertTable () {
        if (this.range && this.selectedTable) {
          this.editor.insertEmbed(this.range.index, 'rgtable', this.selectedTable, 'user')
        }
        this.tableSelector = false
        this.selectedTable = null
      },
      onEditorReady () {
        this.rawTpls = this.tpls.replace(/;@tpl\|main\n/, '')
      },
      onEditorChange (e) {
        this.$emit('update', `;@tpl|main\n${e.html}`)
      }
    },
    computed: {
      ...mapState('generator', {
        tpls: state => state.local.data.tpls,
        tableNames: 'tableNames'
      }),
      editor () {
        return this.$refs.quillEditor.quill
      }
    }
  }
</script>
<style>
  .ql-container .ql-editor {
    min-height: 50vh;
    padding-bottom: 1em;
    max-height: 62vh;
    overflow-y: auto;
  }

  .text-box {
    padding: 0.5em;
    display: flex;
    flex-direction: column;
  }

  .box {
    flex: 1 1 100% !important; /* consume available width */
    overflow-y: auto !important;
  }
</style>
