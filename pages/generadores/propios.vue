<template>
  <div>
    <generator-list-filters/>
    <generator-list :list="list" featured>
      <div slot="title">Generadores Propios</div>
    </generator-list>
  </div>
</template>

<script>
  import {me} from '../../modules/api'
  import {GeneratorList, GeneratorListFilters} from '../../components/generator'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      GeneratorList,
      GeneratorListFilters
    },
    data () {
      return {
        list: []
      }
    },
    computed: {
      ...mapGetters('auth', ['isLogged'])
    },
    methods: {
      async loadList () {
        if (!this.isLogged) return

        this.list = await me.loadOwnGenerators()
      }
    },
    watch: {
      isLogged (logged) {
        if (!logged) return
        this.loadList()
      }
    },
    updated () {
      // TODO: This is a horrible hack. Buhu.
      if (!this.list.length) {
        this.loadList()
      }
    },
    head () {
      return {
        title: `Generadores propios`
      }
    }
  }
</script>
