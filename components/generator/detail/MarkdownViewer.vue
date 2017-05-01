<template>
  <div class="text-box mt-2">
    <v-card class="bluegray darken-1 text elevation-0">
      <v-card-text>
        <slot class="generate" name="button"></slot>
        <vue-markdown class=" text-xs-justify mt-2" :source="generatedText" @rendered="copyRawText"></vue-markdown>
      </v-card-text>
    </v-card>
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
<style scoped>
  .text-box {
    display: flex;
    flex-direction: column;
  }

  .text {
    flex-grow: 1;
  }
</style>
