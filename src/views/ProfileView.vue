<template>
  <h1>{{ contactInfo.userName }} profiil</h1>
  <div class="align-content-center">
    <div class="card card-w-margin">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Eesnimi: {{ contactInfo.firstName }}</li>
        <li class="list-group-item">Perekonnanimi: {{ contactInfo.lastName }}</li>
        <li class="list-group-item">E-mail: {{ contactInfo.email }}</li>
        <li class="list-group-item">Telefon: {{ contactInfo.telephone }}</li>
        <li class="list-group-item">Aadress: {{ contactInfo.address }}</li>
      </ul>
    </div>
  </div>

  <div class="text-center">
    <button @click="moveToEditUserPage" type="button" class="btn btn-warning">Muuda andmeid</button>
  </div>
</template>


<script>
import router from "@/router";

export default {
  name: 'ProfileView',

  data() {
    return {
      contactInfo: {
        userId: '',
        userName: 0,
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        address: ''
      },

      userId: 0,

    }
  },


  methods: {
    getUserInfo() {
      this.$http.get("/user", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.contactInfo = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    moveToEditUserPage() {
      router.push({name: 'editUserRoute'})
    }
  },

  mounted() {
    // this.getUserInfo()
  }

}

</script>

<style>
.card-w-margin {
  width: 18rem;
  margin: auto;
  margin-bottom: 3em;
  margin-top: 3em;
}
</style>