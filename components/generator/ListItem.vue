<template>
  <div>
    <v-list-item ripple dense>
      <left-ribbon v-if="generator.featured && !featured">
        <v-icon slot="content" class="white--text">star</v-icon>
      </left-ribbon>
      <v-list-tile avatar :href="link" router>

        <v-list-tile-content :class="{ 'pl-3': !featured}">
          <v-list-tile-title v-text="generator.name"/>
          <v-list-tile-sub-title> {{generator.desc}} - {{created}}</v-list-tile-sub-title>
        </v-list-tile-content>

          <avatar size="small" :src="generator.author.picture" :alt="generator.author.name"/>

      </v-list-tile>
    </v-list-item>
    <v-divider/>
  </div>
</template>
<script>
  import moment from 'moment'

  export default {
    props: ['featured', 'generator'],
    computed: {
      created () {
        return moment(this.generator.createdAt).format('DD/MM/YY')
      },
      link () {
        return {
          name: 'generadores-slug-id',
          params: {
            slug: this.generator.slug,
            id: this.generator.id
          }
        }
      }
    }
  }
</script>
