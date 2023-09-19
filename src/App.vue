<template>
  <nav class="navbar navbar-dark bg-black ">
    <div class="container d-flex flex-row">
      <router-link to="/" class="navbar-brand p-0">
        <img src="./assets/purjepaus-black.png" style="height: 35px;" alt="logo">
      </router-link>
      <div class="position-relative flex-fill">
        <div class="position-absolute w-100 d-flex justify-content-evenly" style="bottom: -40px">
          <router-link class="text-dark fw-bold btn btn-light shadow-sm rounded-0"
                       tag="button" to="/harbours">Sadamad
          </router-link>
          <router-link class="text-dark fw-bold btn btn-light shadow-sm rounded-0"
                       tag="button" to="/search">Täpsem otsing
          </router-link>
          <router-link class="text-dark fw-bold btn btn-light shadow-sm rounded-0"
                       tag="button" to="/about">Meist
          </router-link>
          <router-link class="text-dark fw-bold btn btn-light shadow-sm rounded-0"
                       tag="button" to="/login">Sisse
          </router-link>
          <router-link class="text-dark fw-bold btn btn-light shadow-sm rounded-0" to="/profile">
            <font-awesome-icon :icon="['fas', 'user']"/>
          </router-link>
        </div>
      </div>

    </div>
  </nav>
  <router-view class="p-4 flex-fill"/>
  <footer class="text-right text-sm-end">
    <div class="text-right text-secondary fw-medium p-3 " style="
background: linear-gradient(0deg, rgba(255,241,179,1) 0%, rgba(255,255,255,0) 100%);">
      © 2023 Copyright:
      <a class="text-dark text-secondary fw-medium" href="./about">Purjepaus</a>

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
