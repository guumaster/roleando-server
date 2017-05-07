<template>
  <v-list dense>
    <v-divider light/>
    <v-subheader>Secciones</v-subheader>
    <v-list-item>
      <v-list-tile :href="{name: 'index' }" router ripple>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Inicio</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>
    <v-list-item>

      <v-list-tile :href="{name: 'generadores'}" router>
        <v-list-tile-action>
          <v-icon>star</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Generadores</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>

    <v-list-item>
      <v-list-tile :href="{name: 'rolodromo'}" router>
        <v-list-tile-action>
          <v-icon>widgets</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Rolodromo</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>

    <v-list-item>
      <v-list-tile :href="{name: 'acerca'}" router>
        <v-list-tile-action>
          <v-icon>info_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Acerca de</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>

    <v-divider light/>
    <v-subheader>Ajustes</v-subheader>

    <v-list-item v-if="!isLogged">
      <v-list-tile :href="{name: 'auth-login'}" router>
        <v-list-tile-action>
          <icon name="sign-in" scale="1.15"></icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Entrar</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>

    <v-list-item v-if="isLogged">
      <v-list-tile @click.native="logout">
        <v-list-tile-action>
          <icon name="sign-out"  flip="horizontal" scale="1.15"></icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Salir</v-list-tile-title>
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
