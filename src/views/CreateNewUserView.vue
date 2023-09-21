<template>
  <div class="container p-4 glass-background">
    <h1>Loo uus kasutaja</h1>
    <div class="col col-4">
      <AlertDanger :alert-message="errorMessage"/>
      <AlertSuccess :alert-message="successMessage"/>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="Eesnimi" class="form-label">Eesnimi
            <font-awesome-icon :icon="['fas', 'asterisk']"/>
          </label>
        </div>
        <div class="col">
          <input v-model="userData.contactFirstName" type="text" class="form-control" id="Eesnimi">
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="Perekonnanimi" class="form-label">Perekonnanimi
            <font-awesome-icon :icon="['fas', 'asterisk']"/>
          </label>
        </div>
        <div class="col">
          <input v-model="userData.contactLastName" type="text" class="form-control" id="Perekonnanimi">
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col col-6">
          <label for="E-mail" class="form-label">E-mail
            <font-awesome-icon :icon="['fas', 'asterisk']"/>
          </label>
        </div>
        <div class="col">
          <input v-model="userData.contactEmail" type="text" class="form-control" id="E-mail">
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col col-6">
          <label for="Kasutajanimi" class="form-label">Kasutajanimi
            <font-awesome-icon :icon="['fas', 'asterisk']"/>
          </label>
        </div>
        <div class="col">
          <input v-model="userData.username" type="text" class="form-control" id="Kasutajanimi">
        </div>
      </div>
    </div>
    <div class="">
      <div class="mb-3">
        <div class="row">
          <div class="col col-6">
            <label for="Parool" class="form-label">Parool
              <font-awesome-icon :icon="['fas', 'asterisk']"/>
            </label>
          </div>
          <div class="col">
            <input v-model="userData.password" type="password" class="form-control" id="Parool">
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div class="row">
          <div class="col col-6">
            <label for="Korda parooli" class="form-label">Korda parooli
              <font-awesome-icon :icon="['fas', 'asterisk']"/>
            </label>
          </div>
          <div class="col">
            <input v-model="passwordConfirmation" type="password" class="form-control" id="Parool uuesti">
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div class="row">
          <div class="col">
            <label for="Aadress" class="form-label">Aadress</label>
          </div>
          <div class="col">
            <input v-model="userData.contactAddress" type="text" class="form-control" id="Aadress">
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div class="row">
          <div class="col col-6">
            <label for="Telefon" class="form-label">Telefon</label>
          </div>
          <div class="col">
            <input v-model="userData.contactTelephone" type="text" class="form-control" id="Telefon">
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col col-6">
        </div>
        <div class="col">
          <div v-if="isLoggedIn" class="btn-group">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                    aria-expanded="false">
              {{
                {
                  user: 'Sinu roll on Kasutaja',
                  captain: 'Sinu roll on Kapten',
                  admin: 'Sinu roll on Admin'
                }[userData.roleName] || 'Vali Roll'
              }}
            </button>
            <div>

            </div>
            <ul class="dropdown-menu">
              <li>
                <button type="button" class="dropdown-item" v-on:click="userData.roleName='user'">Kasutaja</button>
              </li>
              <li>
                <button type="button" class="dropdown-item" v-on:click="userData.roleName='captain'">Kapten</button>
              </li>
              <li>
                <button type="button" class="dropdown-item" v-on:click="userData.roleName='admin'">Admin</button>
              </li>
            </ul>
          </div>
          <div style="margin-top: 15px">
            <button @click="addNewUser" type="button" class="btn btn-success">Loo uus kasutaja</button>
            <button @click="moveToLoginView" type="button"
                    class="btn btn-outline-light shadow-sm rounded-0 mb-3 m-2">
              Tagasi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>


<script>

import {
  NEW_USER_CREATED,
  USER_INFO_UPDATE_ERROR,
  USERNAME_ALREADY_EXISTS
} from "@/assets/script/AlertMessage";
import router from "@/router";
import AlertSuccess from "@/components/AlertSuccess.vue";
import AlertDanger from "@/components/AlertDanger.vue";
import {HARBOUR_NAME_UNAVAILABLE, USERNAME_UNAVAILABLE} from "@/assets/script/ErrorCode";

export default {
  name: 'CreateNewUser',
  components: {AlertDanger, AlertSuccess},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      userData: {
        username: '',
        password: '',
        roleName: 'user',
        contactFirstName: '',
        contactLastName: '',
        contactEmail: '',
        contactTelephone: '',
        contactAddress: '',
        contactIsCaptain: false,
      },
      loginResponse: {
        userId: 0,
        roleName: '',
      },
      passwordConfirmation: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {

    checkLoginStatus() {
      this.isLoggedIn = sessionStorage.getItem('userId') !== null
      if (sessionStorage.getItem('roleName') === 'admin') {
        this.isAdmin = true
      }
    },

    addNewUser() {
      this.resetMessages()
      if (this.mandatoryFieldsAreFilled()) {
        this.userData.roleName === 'captain' ? this.userData.contactIsCaptain = true : false
        this.sendAddNewUserRequest();
      } else {
        this.errorMessage = USER_INFO_UPDATE_ERROR;
      }
    },

    mandatoryFieldsAreFilled() {
      return this.userData.username.length > 0 &&
          this.userData.contactFirstName.length > 0 &&
          this.userData.contactLastName.length > 0 &&
          this.userData.password.length > 0 &&
          this.passwordConfirmation.length > 0 &&
          this.userData.contactEmail.length > 0;
    },

    sendAddNewUserRequest() {
      this.$http
          .post("user", this.userData)
          .then((response) => {
            this.successMessage = NEW_USER_CREATED
            if (this.isAdmin) {
              setTimeout(() => {
                this.resetAllFields()
              }, 2500);
            } else {
              setTimeout(() => {
                this.sendLoginRequest()
              }, 1500);
            }
          }).catch((error) => {
        this.errorMessage = error.message;
        this.handleErrorResponse()
      })
    },

    sendLoginRequest() {
      this.$http
          .get('/login', {
            params: {
              username: this.userData.username,
              password: this.userData.password,
            },
          })
          .then((response) => {
            this.loginResponse = response.data
            this.handleSuccess();
          })
          .catch((error) => {
            this.errorResponse = error.response.data
            if (this.errorResponse.errorCode !== 111) {
              router.push({name: 'errorRoute'})
            }
          })
    },

    handleErrorResponse() {
      if (this.errorResponse.errorCode === USERNAME_UNAVAILABLE) {
        this.errorMessage = this.errorResponse.message
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    handleSuccess() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-update-nav-menu')
      router.push({name: 'homeRoute'})
    },

    resetAllFields() {
      this.userData = []
      this.passwordConfirmation = ''
      this.resetMessages()
    },

    moveToLoginView() {
      router.push({name: 'loginRoute'})
    },

    resetMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },

  },
  mounted() {
    this.resetMessages()
    this.checkLoginStatus()
  }
}
</script>


<style scoped>
label {
  float: right;
  width: 100px; /* Adjust the width as needed to align labels properly */
  text-align: right; /* Optional: Right-align the labels */
  margin-right: 10px; /* Optional: Add some spacing between the label and input */
  white-space: nowrap;
}

.required label:after {
  content: ' *';
  display: inline;
}

input {
  clear: left;
}

.row {
  width: 500px;
  columns: auto;
  align-items: flex-end;
}

.col {
  position: relative;
  left: 275px;
}

.btn {

}

</style>
