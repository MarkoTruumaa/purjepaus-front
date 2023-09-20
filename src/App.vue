<template>
    <nav class="navbar navbar-transparent bg-transparent">
      <div class="container d-flex flex-row">
        <router-link to="/" class="navbar-brand p-0">
          <img src="./assets/logo.png" style="height: 80px; mix-blend-mode: multiply" alt="logo" />
        </router-link>
        <div class="position-relative flex-fill">
          <div class="position-absolute w-100 d-flex justify-content-evenly" style="bottom: -20px">
            <router-link
                class="text-dark fw-bold btn btn-outline-light shadow-sm rounded-0"
                tag="button"
                to="/harbours"
            >Sadamad
            </router-link>
            <router-link
                class="text-dark fw-bold btn btn-outline-light shadow-sm rounded-0"
                tag="button"
                to="/search"
            >Täpsem otsing
            </router-link>
            <router-link
                class="text-dark fw-bold btn btn-outline-light shadow-sm rounded-0"
                tag="button"
                to="/about"
            >Meist
            </router-link>
            <router-link
                v-if="!isLoggedIn"
                class="text-dark fw-bold btn btn-outline-light shadow-sm rounded-0"
                tag="button"
                to="/login"
            >Sisse
            </router-link>
            <router-link
                v-if="isLoggedIn"
                class="text-dark fw-bold btn btn-outline-light shadow-sm rounded-0"
                to="/profile"
            >
              <font-awesome-icon :icon="['fas', 'user']" />
            </router-link>
            <router-link
                v-if="isLoggedIn"
                class="text-dark fw-bold btn btn-outline-light shadow-sm rounded-0"
                tag="button"
                to="#"
                @click="executeLogOut"
            >Välja
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <router-view @event-update-nav-menu="updateNavMenu" class="flex-fill" />
    <footer class="text-center text-sm-start">
      <div
          class="text-center text-dark fw-medium p-3"
          style="
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);
      "
      >
        © 2023 Copyright:
        <a class="text-dark text-dark fw-medium" href="./about">Purjepaus</a>
      </div>
    </footer>

</template>

<script>
import router from "@/router";
import route from "eslint-plugin-vue/lib/meta";

export default {
  computed: {
    route() {
      return route
    }
  },
  data() {
    return {
      isLoggedIn: false,
    }
  },

  methods: {
    updateNavMenu() {
      this.isLoggedIn = sessionStorage.getItem('userId') !== null
    },

    executeLogOut() {
      sessionStorage.clear()
      this.updateNavMenu()
      router.push({name: 'homeRoute'})
    },
  },
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
  color: rgba(7, 40, 84, 0.8) !important;
}
</style>
