<template>
  <v-list dense>
    <v-divider light/>
    <v-subheader>Generadores</v-subheader>
    <v-list-item>
      <v-list-tile :href="{name: 'generadores' }" router ripple>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Todos</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>
    <v-list-item>

      <v-list-tile :href="{name: 'generadores-destacados'}" router>
        <v-list-tile-action>
          <v-icon>star</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Destacados</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>
    <v-list-item>
      <v-list-tile>
        <v-list-tile-action>
          <icon name="user-circle" scale="1.2"></icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Propios</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>

    <v-divider light/>
    <v-subheader>Herramientas</v-subheader>
    <v-list-item>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>widgets</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Rolodromo</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>

    <v-divider light/>
    <v-subheader>Ajustes</v-subheader>

    <v-list-item v-if="!isLogged">
      <v-list-tile :href="{name: 'auth-login'}" router>
        <v-list-tile-action>
          <v-icon>widgets</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>

    <v-list-item v-if="isLogged">
      <v-list-tile @click.native="logout">
        <v-list-tile-action>
          <v-icon>widgets</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>
  </v-list>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'menu-list',
    computed: {
      ...mapGetters('auth', ['isLogged'])
    },
    methods: {
      ...mapActions('auth', ['logout'])
    }
  }
</script>
