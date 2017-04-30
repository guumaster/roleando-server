<template>
  <div class="text-box">
    <vue-markdown class="viewer" :source="generatedText" @rendered="copyRawText"></vue-markdown>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    props: ['text'],
    components: {VueMarkdown},
    data () {
      return {
        rawText: ''
      }
    },
    computed: {
//      onlyClient () {
//        return process.BROWSER_BUILD
//      },
      generatedText () {
        return this.text || '\n\n\n#### No hay plantilla'
      }
    },
    methods: {
      copyRawText (html) {
        if (process.SERVER_BUILD) return ''

        const frag = document.createElement('div')
        frag.innerHTML = html
        this.rawText = frag.innerText
      }
    }
  }
</script>
<style>
  .text-box {
    padding: 0.7em;
    text-align: justify;
  }
  .viewer {
    min-height: 30vh;
  }
</style>
