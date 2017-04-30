<template>
  <div>
    <h4>{{generator.name}}</h4>
    {{generator.desc}}
    <markdown-viewer :text="text"/>
    <v-btn floating class="red" @click.native="generateText">
      <icon name="refresh" scale="2"></icon>
    </v-btn>
  </div>
</template>
<script>
  import MarkdownViewer from './detail/MarkdownViewer.vue'
  import { generator } from '@guumaster/rpgen'

  export default {
    props: ['generator'],
    data () {
      return { rawText: '' }
    },
    components: {
      MarkdownViewer
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
      generateText () {
        this.rawText = this.engine.generate()
      }
    }
  }
</script>
