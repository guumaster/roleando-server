<template>
  <div>
    <v-list-item>
      <v-list-tile avatar :href="link" router>

        <v-list-tile-action v-if="!featured">
          <v-icon v-if="generator.featured" class="pink--text">star</v-icon>
          <v-icon v-else class="grey--text">star</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title v-text="generator.name"/>
          <v-list-tile-sub-title v-text="generator.desc"/>
        </v-list-tile-content>

          <avatar size="small" :src="generator.author.picture"/>

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
