<template>
  <div>
    <!--<h3>{{generator.name}}</h3>-->
    <!--<div>{{generator.desc}}</div>-->
    {{generator}}
  </div>
</template>

<script>
  import axios from '~plugins/axios'

  export default {
    computed: {
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
          error({statusCode: 404, message: 'User not found'})
        })
    },
    head () {
      return {
        title: `Generador: ${this.generator.name}`
      }
    }
  }
</script>
