<template>
  <div class="detail">
    <card-header :generator="generator" @edit="editionMode = !editionMode"></card-header>

    <markdown-viewer v-if="!editionMode" :text="text" class="viewer" slot="generator">
      <generate-button slot="button" @generate="generateText"/>
    </markdown-viewer>

    <tab-container  v-if="editionMode" :editionMode="editionMode" class="header">

      <markdown-viewer :text="text" class="viewer" slot="generator">
        <generate-button slot="button" @generate="generateText"/>
      </markdown-viewer>

      <div slot="tpls" class="elevation-0">
       asdf
      </div>

      <div slot="tables" class="elevation-0">
        xxx
      </div>
    </tab-container>
  </div>
</template>
<script>
  import MarkdownViewer from './detail/MarkdownViewer.vue'
  import Header from './detail/Header.vue'
  import TabContainer from './detail/TabContainer.vue'
  import GenerateButton from './detail/GenerateButton.vue'
  import { generator } from '@guumaster/rpgen'

  export default {
    props: ['generator'],
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
<style scoped>

  .detail {
    /*height: 100%;*/
    height: 89vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    /*height: 75vh;*/
    flex-grow: 1;
    flex-basis: 100%;
  }

  .viewer {
    /*height: 75vh;*/
    overflow-y: auto;
    flex-grow: 1;
  }
</style>
