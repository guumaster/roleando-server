<template>
  <div>
    <v-card class="text-xs-center">
      <v-card-row class="secondary white--text">
        <v-card-title>Rolodromo</v-card-title>
      </v-card-row>
      <v-card-row>
        <v-card-text>
          <v-text-field
            name="rollText"
            label="Escribe tu tirada"
            hint="Ejemplo: mejores 3 de 4d6"
            persistent-hint
            v-model="rawText"
            @input="update"
            class="input-group--focused big-line"
            prepend-icon="forward"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="red roller-btn" floating large @click.native="run" :disabled="disabled">
            <icon name="refresh" scale="2.1"></icon>
          </v-btn>
        </v-card-text>
      </v-card-row>
      <v-card-row>
        <v-card-text>
          <span class="display-1 grey--text">{{roll.taken || roll.rolls}} {{mod}} = </span>
          <span class="red--text display-2">
                  <animate-number
                    v-if="clientOnly"
                    ref="anim"
                    :from="roll.total - 5"
                    :to="roll.total"
                    mode="manual"
                    duration="500"
                    easing="swingTo"
                    from-color="#fff"
                  ></animate-number>
          </span>
        </v-card-text>
      </v-card-row>
    </v-card>
    <v-list subheader class="white">
      <v-subheader>Previas</v-subheader>
      <v-list-item v-for="(item,i) in past" :key="i">
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{item.rolls}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <v-btn outline icon class="red--text">{{item.total}}</v-btn>
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
  import rpgen from '@guumaster/rpgen'
  import { debounce } from 'lodash'

  export default {
    data () {
      return {
        clientOnly: process.BROWSER_BUILD,
        disabled: false,
        rawText: 'mejores 3 de 4d6+1',
        roll: 0,
        roller: null,
        past: []
      }
    },
    watch: {
      roll: function (val) {
        if (this.$refs.anim.start) {
          this.$refs.anim.reset(val.total - 5, val.total)
          this.$refs.anim.start()
        }
      }
    },
    computed: {
      mod () {
        if (!this.roll.mod) return ''
        return `${this.roll.sign} ${Math.abs(this.roll.mod)}`
      }
    },
    methods: {
      logger (r) {
        // TODO: a nice logger
      },
      run () {
        if (this.roll) {
          this.past.unshift(this.roll)
          this.past.splice(5)
        }
        this.roll = this.roller(true)
        this.from = this.roll.total - 5
      },
      update: debounce(function (value) {
        try {
          this.roller = rpgen.roller.create(value)
          this.disabled = false
        } catch (e) {
          this.disabled = true
//          console.log(e)
        }
      }, 300)
    },
    created () {
      this.roller = rpgen.roller.create(this.rawText, {fn: this.logger})
      this.past = []
      if (this.clientOnly) {
        this.run()
      }
    }
  }
</script>
<style scoped>
  .big-line input {
    line-height: 15em;
    height: 5em !important;
  }

  .roll-btn {
    width: 30%;
  }
</style>
