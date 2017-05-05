<template>
  <div class="fixed-layout">

    <div id="generator-detail">
      <card-header
        :editionMode="editionMode"
        @edit="editionMode = !editionMode"
        @delete="deleteGenerator"
        @saveMetadata="localMeta"
        @save="saveGenerator"
      ></card-header>

      <markdown-viewer v-if="!editionMode" :text="text" class="viewer" slot="generator">
        <generate-button slot="button" @generate="generateText"/>
      </markdown-viewer>

      <tab-container v-if="editionMode" :editionMode="editionMode" :isNew="isNew" class="tabbed-view">

        <markdown-viewer :text="text" class="viewer" slot="generator">
          <generate-button slot="button" @generate="generateText"/>
        </markdown-viewer>

        <div slot="tpls" class="viewer">
          <tpl-viewer @update="updateTpls"></tpl-viewer>
        </div>

        <div slot="tables" class="viewer">
          <tables-viewer @update="updateTables"></tables-viewer>
        </div>
        <div slot="external" class="viewer">
          <external-viewer
            @remove="removeTable"
            @add="addTable"
          ></external-viewer>
        </div>
      </tab-container>
    </div>
  </div>
</template>
<script>
  import MarkdownViewer from './detail/MarkdownViewer.vue'
  import Header from './detail/Header.vue'
  import TabContainer from './detail/TabContainer.vue'
  import TplViewer from './detail/TplViewer.vue'
  import TablesViewer from './detail/TablesViewer.vue'
  import ExternalViewer from './detail/ExternalViewer.vue'
  import GenerateButton from './detail/GenerateButton.vue'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  import rpgen from '@guumaster/rpgen'

  export default {
    data () {
      return {
        rawText: '',
        editionMode: false
      }
    },
    components: {
      'card-header': Header,
      TabContainer,
      MarkdownViewer,
      TplViewer,
      TablesViewer,
      ExternalViewer,
      GenerateButton
    },
    created () {
      this.editionMode = this.isNew
      this.generateText()
    },
    computed: {
      ...mapGetters('generator', ['canEdit', 'isNew']),
      ...mapState('generator', {
        generator: 'local'
      }),
      text () {
        return this.rawText
      },
      engine () {
        try {
          const { tpls, tables } = this.generator.data
          const childrenNames = Object.keys(this.generator.children)
          let children = ''
          if (childrenNames.length) {
            children = childrenNames.reduce((str, key) => {
              const data = this.generator.children[key]
              return `${str}\n\n${data.tables}`
            }, '')
          }
          return rpgen.generator.create(`${tpls}\n\n${tables}\n\n${children}`)
        } catch (e) {
          console.log(e)
          this.error('Error cargando datos')
        }
      }
    },
    methods: {
      ...mapMutations('generator', ['localData', 'localMeta', 'removeExternal', 'addExternal']),
      ...mapMutations('toast', ['success', 'error']),
      ...mapActions('generator', ['remove', 'save']),
      generateText () {
        try {
          this.rawText = this.engine.generate()
        } catch (e) {
          console.log(e)
          this.rawText = 'Error al generar contenido'
        }
      },
      async deleteGenerator () {
        await this.remove(this.generator.id)
        this.$router.replace({
          name: 'generadores'
        })
      },
      async saveGenerator () {
        const saved = await this.save(this.generator)
        this.$router.replace({
          name: 'generadores-slug-id',
          params: {
            slug: saved.slug,
            id: saved.id
          }
        })
      },
      updateTables (tables) {
        this.localData({tables})
        this.generateText()
      },
      updateTpls (tpls) {
        this.localData({tpls})
        this.generateText()
      },
      removeTable (key) {
        this.removeExternal(key)
        this.generateText()
      },
      addTable (payload) {
        this.addExternal(payload)
        this.generateText()
      }
    }
  }
</script>
<style>

  .fixed-layout {
    display: flex;
    flex-direction: column;
    height: 89vh;
    overflow: auto;
  }

  #generator-detail {
    display: flex;
    flex-direction: column;
  }

  #generator-detail .viewer {
    flex: 1 1 77vh;
  }

  .tabbed-view #generator .viewer {
    flex: 1 1 68vh;
  }

  .tabbed-view {
    display: flex;
    flex-direction: column;
  }
</style>
