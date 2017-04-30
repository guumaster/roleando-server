<template>
  <v-app top-toolbar class="blue-grey lighten-4">
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar"/>
      <v-toolbar-title>Roleando</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon dark>
        <avatar v-if="profilePicture" size="small" :src="profilePicture"/>
        <icon v-else name="user-circle" scale="2"></icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-sidebar left fixed drawer v-model="sidebar">
        <nuxt-link to="/">
          <logo size="normal" class="mt-3 mb-3"/>
        </nuxt-link>
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
  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    components: {
      MenuList
    },
    computed: {
      ...mapGetters('auth', ['isLogged']),
      ...mapState('auth', ['user']),
      profilePicture () {
        if (!this.isLogged) return

        return `${this.user.profile.picture}?sz=50`
      }
    },
    methods: {
      ...mapActions('auth', ['loadUserInfo'])
    },
    created () {
      if (process.BROWSER_BUILD) {
        this.loadUserInfo()
      }
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
