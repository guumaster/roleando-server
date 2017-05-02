<template>
  <div>
    <generator-list-filters />
    <generator-list :list="list">
      <div slot="title">Generadores Aleatorios</div>
    </generator-list>
  </div>
</template>

<script>
  import { generators } from '../../modules/api'
  import { GeneratorList, GeneratorListFilters } from '../../components/generator'

  export default {
    components: {
      GeneratorList,
      GeneratorListFilters
    },
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
