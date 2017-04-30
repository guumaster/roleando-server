<template>
  <div class="detail">
    <card-header :generator="generator"></card-header>
    <markdown-viewer :text="text" class="viewer">
      <generate-button slot="button" @generate="generateText"/>
    </markdown-viewer>
  </div>
</template>
<script>
  import MarkdownViewer from './detail/MarkdownViewer.vue'
  import Header from './detail/Header.vue'
  import GenerateButton from './detail/GenerateButton.vue'
  import { generator } from '@guumaster/rpgen'

  export default {
    props: ['generator'],
    data () {
      return {rawText: '', test: false}
    },
    components: {
      'card-header': Header,
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
    height: 89vh;
    display: flex;
    flex-direction: column;
  }

  .viewer {
    height: 75vh;
    overflow-y: auto;
    flex-grow: 1;
  }
</style>
