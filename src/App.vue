<template>

  <nav class="navbar navbar-dark bg-black ">
    <div class="container position-relative">
      <router-link to="/" class="navbar-brand p-0">
        <img src="./assets/purjepaus-black.png" style="height: 30px;" alt="logo">
      </router-link>
      <router-link class="text-white fw-bold btn btn-secondary-outline shadow-lg"
                   tag="button" to="/harbours">Sadamad</router-link>
      <router-link class="text-white fw-bold btn btn-secondary-outline shadow-lg"
                   tag="button" to="/search">Täpsem otsing</router-link>
      <router-link class="text-white fw-bold btn btn-secondary-outline shadow-lg"
                   tag="button" to="/about">Meist</router-link>
      <router-link class="text-white fw-bold btn btn-secondary-outline shadow-lg"
                   tag="button"  to="/login">Sisse</router-link>
      <router-link class="text-white fw-bold" to="/profile">
        <font-awesome-icon :icon="['fas', 'user']" />
      </router-link>

    </div>
  </nav>
  <router-view class="p-4 flex-fill"/>
  <footer class="bg-warning-subtle  text-center text-lg-start">

    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0);">
      © 2023 Copyright:
      <a class="text-dark" href="https://mdbootstrap.com/">Purjepaus</a>
    </div>

  </footer>

</template>


<script>

import {ADMIN} from "@/assets/script/Role";
import router from "@/router";

export default {
  data() {
    return {
      isLoggedIn: false,


    }
  },

  methods: {
    updateNavMenu() {
      this.isLoggedIn = sessionStorage.getItem('userId') !== null

    }
  }
}

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a.router-link-exact-active {
  color: #bde8e8 !important;
}
</style>
