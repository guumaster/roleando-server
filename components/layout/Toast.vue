<template>
  <v-snackbar
    :class="type"
    :timeout="toast.timeout"
    :top="toast.top"
    :bottom="toast.bottom"
    v-model="snackbar"
  >
    {{toast.message}}
    <v-btn flat class="black--text" @click.native="close">
      <v-icon>clear</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        timer: null
      }
    },
    watch: {
      toast: function (val) {
        this.snackbar = true

        if (!val.show) return

        this.timer = setTimeout(this.close, val.timeout + 100)
      }
    },
    computed: {
      type () {
        switch (this.toast.type) {
          case 'success':
          case 'error':
            return this.toast.type

          default:
            return 'info'
        }
      },
      snackbar () {
        return this.toast.show
      },
      ...mapState('toast', {
        toast: 'data'
      })
    },
    methods: {
      ...mapMutations('toast', ['hide']),
      close () {
        this.snackbar = false
        clearTimeout(this.timer)
        this.hide()
      }
    }
  }
</script>
