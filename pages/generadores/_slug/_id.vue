<template>
  <generator-detail/>
</template>

<script>
  import { GeneratorDetail } from '../../../components/generator'

  export default {
    components: {
      GeneratorDetail
    },
    async asyncData ({req, store, params, error}) {
      try {
        const generator = await store.dispatch('generator/load', params.id)
        return {generator}
      } catch (e) {
        console.log('Error getting generator', req.path, params.id, e.stack)
        error({statusCode: 404, message: 'Generador no encontrado'})
      }
    },
    head () {
      return {
        title: `Generador: ${this.generator.name}`
      }
    },
    meta () {
      const TITLE = `Generador: ${this.generator.name}`
      const DESC = this.generator.desc
      return {
        meta: [
          {name: 'description', content: DESC, hid: 'desc'},
          // Twitter
          { name: 'twitter:title', content: TITLE, hid: 'twd' },
          // Google+ / Schema.org
          { itemprop: 'name', content: TITLE, hid: 'gpt' },
          { itemprop: 'description', content: DESC, hid: 'gpd' },
          // Facebook / Open Graph
          { property: 'og:title', content: TITLE, hid: 'ogt' },
          { property: 'og:description', content: DESC, hid: 'ogd' }
        ]
      }
    }
  }
</script>
