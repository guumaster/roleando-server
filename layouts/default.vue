<template>
  <v-app top-toolbar class="blue-grey lighten-4">
    <v-toolbar fixed class="site-toolbar">
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar"/>
      <v-toolbar-title>Roleando</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon dark>
        <avatar v-if="profilePicture" size="small" :src="profilePicture" :alt="profileName"/>
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
        <v-container fluid class="mt-5 pt-3">
          <v-row>
            <v-col xs12 md8 offset-md2>
              <nuxt/>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
      <toast/>
    </main>
  </v-app>
</template>

<script>
  import Toast from '../components/layout/Toast.vue'
  import MenuList from '../components/layout/MenuList.vue'
  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    components: {
      MenuList,
      Toast
    },
    computed: {
      ...mapGetters('auth', ['isLogged']),
      ...mapState('auth', ['user']),
      profilePicture () {
        if (!this.isLogged) return

        return `${this.user.profile.picture}?sz=50`
      },
      profileName () {
        return (!this.isLogged) ? this.user.profile.name : ''
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

  .above-all {
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 10;
  }

  .site-toolbar {
    height: 3.4em!important;
  }

</style>
