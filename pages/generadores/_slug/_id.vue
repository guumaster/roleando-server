<template>
  <generator-detail :generator="generator" />
</template>

<script>
  import axios from '~plugins/axios'
  import { GeneratorDetail } from '../../../components/generator'

  export default {
    components: {
      GeneratorDetail
    },
    asyncData ({store, params, error}) {
      return axios.get(`/api/generators/table/${params.id}`)
        .then(res => res.data)
        .then(generator => {
          store.commit('generator/set', generator)
          return { generator }
        })
        .catch(e => {
          console.log('Error getting generator', e)
          error({statusCode: 404, message: 'Generator not found'})
        })
    },
    head () {
      return {
        title: `Generador: ${this.generator.name}`
      }
    }
  }
</script>
