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
  import { generators } from '../../modules/api'

  export default {
    asyncData () {
      return generators.loadAll()
        .then(list => {
          return {list}
        })
    },
    head () {
      return {
        title: `Generadores`
      }
    }
  }
</script>
