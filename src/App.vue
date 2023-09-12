<template>
  <nav class="navbar navbar-dark bg-black">
    <div class="container">
      <router-link to="/" class="navbar-brand p-0">
        <img src="./assets/purjepaus-black.png" style="height: 30px;" alt="logo">
      </router-link>
      <router-link class="text-white fw-bold" to="/harbours">Sadamad</router-link>
      <router-link class="text-white fw-bold" to="/search">Täpsem otsing</router-link>
      <router-link class="text-white fw-bold" to="/about">Meist</router-link>
      <router-link class="text-white fw-bold" to="/login">Sisse</router-link>
    </div>
  </nav>
  <router-view class="p-4"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a.router-link-exact-active {
  color: #42b983 !important;
}
</style>
<script setup>
</script>