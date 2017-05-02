<template>
  <generator-detail/>
</template>

<script>
  import { GeneratorDetail } from '../../../components/generator'

  export default {
    components: {
      GeneratorDetail
    },
    async asyncData ({store, params, error}) {
      try {
        const generator = await store.dispatch('generator/load', params.id)
        return {generator}
      } catch (e) {
        console.log('Error getting generator', e)
        error({statusCode: 404, message: 'Generator not found'})
      }
    },
    head () {
      return {
        title: `Generador: ${this.generator.name}`
      }
    }
  }
</script>
