<template>
  <div>
    <h3>Here goes a generator list</h3>
    <div>
      <div v-for="generator in list">
        {{generator.name}}
      </div>
    </div>

  </div>
</template>

<script>
  import axios from '~plugins/axios'

  export default {
    async asyncData () {
      const {data} = await axios.get('/api/generators/tables')
      return {
        list: data
      }
    },
    head () {
      return {
        title: `Generadores`
      }
    }
  }
</script>
