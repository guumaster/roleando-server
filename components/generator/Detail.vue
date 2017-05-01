<template>
  <div class="fixed-layout" >
    <div id="generator-detail">
      <card-header :generator="generator" @edit="editionMode = !editionMode"></card-header>

      <markdown-viewer v-if="!editionMode" :text="text" class="viewer" slot="generator">
        <generate-button slot="button" @generate="generateText"/>
      </markdown-viewer>

      <tab-container v-if="editionMode" :editionMode="editionMode" class="tabbed-view">

        <markdown-viewer :text="text" class="viewer" slot="generator">
          <generate-button slot="button" @generate="generateText"/>
        </markdown-viewer>

        <div slot="tpls" class="viewer">
          <tpl-viewer :generator="generator"></tpl-viewer>
        </div>

        <div slot="tables" class="viewer">
          <tables-viewer :generator="generator"></tables-viewer>
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
  import GenerateButton from './detail/GenerateButton.vue'
  import { generator } from '@guumaster/rpgen'

  export default {
    props: ['generator'],
    data () {
      return {
        rawText: '',
        editionMode: true
      }
    },
    components: {
      'card-header': Header,
      TabContainer,
      MarkdownViewer,
      TplViewer,
      TablesViewer,
      GenerateButton
    },
    computed: {
      text () {
        return this.rawText
      }
    },
    created () {
      const content = `${this.generator.data.tables}\n\n${this.generator.data.tpls}`
      this.engine = generator.create(content)
      this.generateText()
    },
    methods: {
      async generateText () {
        this.rawText = this.engine.generate()
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
