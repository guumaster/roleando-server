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
      const TITLE = `Generador: ${this.generator.name}`
      const DESC = this.generator.desc
      return {
        title: TITLE,
        meta: [
          // Twitter
          { name: 'twitter:title', content: TITLE },
          // Google+ / Schema.org
          { itemprop: 'name', content: TITLE },
          { itemprop: 'description', content: DESC },
          // Facebook / Open Graph
          { property: 'og:title', content: TITLE },
          { property: 'og:description', content: DESC },
        ]
      }
    }
  }
</script>
