<template>
  <v-app top-toolbar class="blue-grey lighten-4">
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar"/>
      <v-toolbar-title>Roleando</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon dark>
        <icon name="user-circle" scale="2"></icon>
        <!--<v-icon>account_circle</v-icon>-->

      </v-btn>
    </v-toolbar>
    <main>
      <v-sidebar left fixed drawer v-model="sidebar">
        <nuxt-link to="/"><logo size="normal"/></nuxt-link>
        <menu-list/>
      </v-sidebar>
      <v-content class="blue-grey lighten-4">
        <v-container fluid class="mt-5 pt-3 text-xs-center">
          <v-row>
            <v-col xs12 md8 offset-md2>
              <nuxt/>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  import MenuList from '../components/layout/MenuList.vue'
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions({
        loadUserInfo: 'auth/loadUserInfo'
      })
    },
    created () {
      if (process.BROWSER_BUILD) {
        this.loadUserInfo()
      }
    },
    components: {
      MenuList
    },
    data () {
      return {
        sidebar: false
      }
    }
  }
</script>
<style>
  a {
    text-decoration: none;
  }
</style>
