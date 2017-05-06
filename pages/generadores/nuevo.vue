<template>
  <generator-detail/>
</template>

<script>
  import { GeneratorDetail } from '../../components/generator'

  export default {
    components: {
      GeneratorDetail
    },
    asyncData ({store}) {
      const emptyGenerator = {
        name: 'Nuevo generador',
        desc: 'Descripción',
        children: {},
        data: {
          tpls: ';@tpl|main\n\n[algo]',
          tables: ';algo\nlinea 1\nlinea 2\nlinea 3'
        }
      }
      store.commit('generator/set', emptyGenerator)
    },
    head () {
      return {
        title: `Nuevo generador`
      }
    }
  }
</script>
