<template>
  <div>
    <h3>Here goes a featured generator list</h3>
    <div>
      <div v-for="generator in list">
        {{generator.name}}
        <nuxt-link :to="{
          name: 'generadores-slug-id',
          params: {
            slug: generator.slug,
            id: generator.id
          }
        }">{{generator.id}}
        </nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
  import { generators } from '../../modules/api'

  export default {
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
