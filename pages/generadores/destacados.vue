<template>
  <div>
    <generator-list-filters />
    <generator-list :list="list" featured>
      <div slot="title">Generadores Aleatorios Destacados</div>
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
      return generators.loadFeatured()
        .then(list => {
          return {list}
        })
    },
    head () {
      return {
        title: `Generadores destacados`
      }
    }
  }
</script>
