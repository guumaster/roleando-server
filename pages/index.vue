<template>
  <div>
    <div class="title">
      <h2>Main content</h2>
      <v-btn primary>Primary button</v-btn>
      <v-btn secondary>Secondary button</v-btn>
      <v-btn success>Success button</v-btn>
    </div>
    <icon label="No Photos" class="red--text text--darken-2">
      <icon name="camera"></icon>
      <icon name="ban" scale="2"></icon>
    </icon>
    <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>

    <ul class="users">
      <li>
        <nuxt-link :to="{ name: 'generadores' }">generadores</nuxt-link>
      </li>
      <li >
        <nuxt-link :to="{ name: 'generadores-destacados' }">destacados</nuxt-link>
      </li>

    </ul>
  </div>
</template>
