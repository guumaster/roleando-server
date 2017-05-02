
import Vue from 'vue'
import AnimateNumber from 'vue-animate-number'

if (process.BROWSER_BUILD) {
  Vue.use(AnimateNumber)
} else {
  Vue.use('animate-number', {})
}
