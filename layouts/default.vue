<template>
  <v-app top-toolbar>
    <v-toolbar>
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
        <logo/>
        <menu-list/>
      </v-sidebar>
      <v-content>
        <v-container fluid class="text-xs-center">
          <nuxt/>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  import MenuList from '../components/layout/MenuList.vue'
  import Logo from '../components/layout/Logo.vue'
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
      MenuList,
      Logo
    },
    data () {
      return {
        sidebar: false
      }
    }
  }
</script>
