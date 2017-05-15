<template>
  <div>
    <v-card v-if="name">
      <v-progress-linear success height="2" v-model="progressPerc"></v-progress-linear>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-row>
        <span>Total duration: {{ durationLabel }}</span>
        <span>Time: {{ timeLabel }}</span>
      </v-card-row>

      <v-card-row>
        <v-container >
          <v-row>

            <v-col xs3>
              <v-btn icon primary @click.native="togglePlayback">
                <v-icon v-show="playing">pause</v-icon>
                <v-icon v-show="!playing">play_arrow</v-icon>
              </v-btn>
              <v-btn icon secondary @click.native="stop">
                <v-icon>stop</v-icon>
              </v-btn>
            </v-col>
            <v-col xs2>
              <v-slider class="vol" min="0" max="100" step="20" v-model="sliderVal" @input="userVol"></v-slider>
            </v-col>
          </v-row>
        </v-container>
      </v-card-row>
    </v-card>

  </div>
</template>
<script>
  import VueHowler from 'vue-howler'

  import moment from 'moment'

  export default {
    props: ['name'],
    mixins: [VueHowler],
    created () {
      this.sliderVal = Math.floor(this.volume * 100)
    },
    watch: {
      volume () {
        this.sliderVal = Math.floor(this.volume * 100)
      }
    },
    computed: {
      progressPerc () {
        return this.progress * 100
      },
      sliderVal () {
        return this.volume * 100
      },
      durationLabel () {
        const duration = moment.duration(this.duration, 'seconds')
        return moment(duration.asMilliseconds()).format('mm:ss')
      },
      progressLabel () {
        return (this.progress * 100).toFixed(2)
      },
      timeLabel () {
        return moment(moment.duration(this.seek, 'seconds').asMilliseconds()).format('mm:ss')
      }
    },
    methods: {
      userVol (val) {
        this.setVolume(val / 100)
      }
    }
  }
</script>
<style>
  .vol .input-group__details {
    display: none!important;
  }
</style>
