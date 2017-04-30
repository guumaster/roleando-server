<template>
  <div class="white">
    <v-list two-line subheader>
      <v-subheader>
        <slot name="title"></slot>
      </v-subheader>
      <template v-for="generator in list">
        <list-item :generator="generator" :featured="featured" :key="generator.id"></list-item>
      </template>
    </v-list>
  </div>

</template>
<script>
  import ListItem from './ListItem.vue'
  export default {
    props: {
      list: Array,
      featured: Boolean
    },
    components: {ListItem}
  }
</script>
