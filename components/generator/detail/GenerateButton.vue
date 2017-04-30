<template>
  <v-btn floating class="red generate" @click.native="$emit('generate')">
    <icon name="refresh" scale="1.75"></icon>
  </v-btn>
</template>

<style scoped>
  .generate {
    position: sticky;
    float: right;
    top: 0.5em;
    right: 0.5em;
  }

  /*
    .spin {
      animation-name: spin;
      animation-duration: 300ms;
      animation-iteration-count: 1;
      animation-timing-function: linear;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  */
</style>
