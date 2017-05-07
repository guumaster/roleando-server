<template>
  <div>
    <v-toolbar class="generator-header  elevation-0 red darken-1 white--text">
      <v-btn small outline v-for="item in options"
             v-if="loggedBtn(item)"
             :class="btnColor(item)"
             :key="item.value"
             @click.native="navigate(item.value)">
        <v-icon :class="iconColor(item)">{{item.icon}}</v-icon>
        <span class="hidden-sm-and-down"> {{item.text}}</span>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn small outline @click.native="navigate('generadores-nuevo')">
        <v-icon>add_circle_outline</v-icon>
        <span class="hidden-sm-and-down">Nuevo</span>
      </v-btn>
    </v-toolbar>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { isUndefined } from 'lodash'

  export default {
    data () {
      return {
        currentRoute: this.$route.name,
        options: [
          {
            text: 'Todos',
            icon: 'list',
            iconColor: 'grey',
            color: 'red darken-4',
            value: 'generadores'
          },
          {
            text: 'Destacados',
            icon: 'star',
            iconColor: 'yellow',
            color: 'red darken-4',
            value: 'generadores-destacados'
          },
          {
            text: 'Mios',
            icon: 'account_circle',
            iconColor: 'orange',
            color: 'red darken-4',
            value: 'generadores-propios',
            logged: true
          }
        ]
      }
    },
    computed: {
      ...mapGetters('auth', ['isLogged'])
    },
    methods: {
      navigate (route) {
        if (route === this.currentRoute) return

        this.$router.push({
          name: route
        })
      },
      loggedBtn (item) {
        if (isUndefined(item.logged)) return true

        return (this.isLogged && item.logged)
      },
      iconColor (item) {
        return {
          [`${item.iconColor}--text`]: true
        }
      },
      btnColor (item) {
        const selected = this.currentRoute === item.value
        return {
          [`${item.color}--text`]: true,
          'red': selected,
          'darken-2': selected,
          'white--text': selected

        }
      }
    }
  }
</script>
<style scoped>
  .generator-header {
    height: 2.7em !important;
  }

</style>
