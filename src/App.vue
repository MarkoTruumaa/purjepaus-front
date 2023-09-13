<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/harbours">Sadamad</router-link> |
    <router-link to="/search">Täpsem otsing</router-link> |
    <router-link to="/about">Meist</router-link> |
    <router-link to="/login">Sisse</router-link> |
  </nav>
  <router-view/>
</template>

<script>
export default {


}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
