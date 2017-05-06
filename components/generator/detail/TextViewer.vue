<template>
  <v-card class="text-box mt-2 bluegray darken-1">
      <v-card-text class="md-container">
        <slot class="generate" name="button"></slot>
        <div class="mt-2 ql-editor" v-html="generatedText"></div>
      </v-card-text>
  </v-card>
</template>
<script>

  export default {
    props: ['text'],
    data () {
      return {
        rawText: ''
      }
    },
    computed: {
      generatedText () {
        return this.text || '\n\n\nNo hay plantilla'
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

  .md-container {
    flex: 1 1 100%;
    overflow-y: auto!important;
  }
</style>
