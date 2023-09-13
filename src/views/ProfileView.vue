<template>
  <h1>Minu profiil</h1>
    <div class="align-content-center">
          <div class="card card-w-margin">
            <div class="card-header">
              Kasutajanimi: {{ contactInfo.userName }}
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Eesnimi: {{ contactInfo.firstName }}</li>
              <li class="list-group-item">Perekonnanimi: {{ contactInfo.lastName }}</li>
              <li class="list-group-item">E-mail: {{ contactInfo.email }}</li>
              <li class="list-group-item">Telefon: {{ contactInfo.telephone }}</li>
              <li class="list-group-item">Aadress: {{ contactInfo.address }}</li>
            </ul>
          </div>
        </div>
  <tbody>

  </tbody>

  <div class="text-center">
    <button @click="moveToEditUserPage" type="button" class="btn btn-warning">Muuda andmeid</button>
  </div>


</template>


<style>
  .card-w-margin {
    width: 18rem;
    margin: auto;
    margin-bottom: 3em;
    margin-top: 3em;
  }
</style>

<script>
import router from "@/router";

export default {
  name: 'ProfileView',

  data() {
    return {
      contactInfo: [{
        userId: '',
        userName: 0,
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        address: ''
      }],

    }
  },


  methods: {
    getUserId(userId) {
      this.$http.get("/profile")
          .then(response => {
            this.userId = response.data
          })
          .catch(error => {

            console.log('err', error)

            //router.push({name: 'errorRoute'})
          })
    },

    moveToEditUserPage() {
      router.push({name: 'editUserRoute'})
    }
  },

  mounted() {
    this.getUserId()
  }

}



</script>