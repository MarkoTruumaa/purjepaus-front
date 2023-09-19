<template>
  <div>
    <div class="margin mt-3">
      <h1>Loo uus kasutaja</h1>
    </div>
    <div v-if="successMessage" class="alert-success">
      <div class="text-bg-success p-3">{{ successMessage }}</div>
    </div>
    <div v-if="errorMessage" class="alert-warning">
      <div class="text-bg-danger p-3">{{ errorMessage }}</div>
    </div>

    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="Eesnimi" class="form-label">Eesnimi <font-awesome-icon :icon="['fas', 'asterisk']"/></label>
        </div>
        <div class="col">
          <input v-model="userData.contactFirstName" type="text" class="form-control" id="Eesnimi">
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col">
          <label for="Perekonnanimi" class="form-label">Perekonnanimi<font-awesome-icon :icon="['fas', 'asterisk']"/></label>
        </div>
        <div class="col">
          <input v-model="userData.contactLastName" type="text" class="form-control" id="Perekonnanimi">
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col col-6">
          <label for="E-mail" class="form-label">E-mail <font-awesome-icon :icon="['fas', 'asterisk']"/></label>
        </div>
        <div class="col">
          <input v-model="userData.contactEmail" type="text" class="form-control" id="E-mail">
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row">
        <div class="col col-6">
          <label for="Kasutajanimi" class="form-label">Kasutajanimi <font-awesome-icon :icon="['fas', 'asterisk']"/></label>
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
            <label for="Parool" class="form-label">Parool <font-awesome-icon :icon="['fas', 'asterisk']"/></label>
          </div>
          <div class="col">
            <input v-model="userData.password" type="password" class="form-control" id="Parool">
          </div>
        </div>
      </div>
      <div class="mb-3">
        <div class="row">
          <div class="col col-6">
            <label for="Korda parooli" class="form-label">Korda parooli <font-awesome-icon :icon="['fas', 'asterisk']"/></label>
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
    <div class="btn-group">
      <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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
    <div>
      <button @click="addNewUser" type="button" class="btn btn-success">Loo uus kasutaja</button>
    </div>
  </div>


</template>


<script>

import {
  NEW_USER_CREATED,
  ROLE_NAME_NOT_SELECTED,
  USER_INFO_UPDATE_ERROR,
  USERNAME_ALREADY_EXISTS
} from "@/assets/script/AlertMessage";
import router from "@/router";

export default {
  name: 'CreateNewUser',
  data() {
    return {
      userData: {
        username: '',
        password: '',
        roleName: '',
        contactFirstName: '',
        contactLastName: '',
        contactEmail: '',
        contactTelephone: '',
        contactAddress: '',
        contactIsCaptain: true,
      },
      passwordConfirmation: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {

    mandatoryFieldsAreFilled() {
      return this.userData.username.length > 0 &&
          this.userData.password.length > 0 &&
          this.passwordConfirmation.length > 0 &&
          this.userData.contactEmail.length > 0;
    },

    roleNameIsSelected() {
      return this.userData.roleName.length > 0
    },

    displaySuccessMessage() {
      this.displaySuccessMessage = NEW_USER_CREATED
    },

    addNewUser() {

      if (!this.mandatoryFieldsAreFilled()) {
        this.errorMessage = USER_INFO_UPDATE_ERROR;
      } else if (!this.roleNameIsSelected()) {
        this.errorMessage = ROLE_NAME_NOT_SELECTED;
      } else {
        this.sendAddNewUserRequest();
      }
    },

    sendAddNewUserRequest() {
      this.$http.post("user", this.userData, {}).then((response) => {
        if (response.status === 200) {
          this.displaySuccessMessage()
          setTimeout(() => {
            this.successMessage = ''
            router.push({name: 'loginRoute', replace: true})
          }, 4500)
        } else if (response.status === 403) {
          this.errorMessage = USERNAME_ALREADY_EXISTS
        }

      }).catch((error) => {

        this.errorMessage = error.message;
      })
    }


  }
}
</script>


<style scoped>
label {
  float: right;
  width: 100px; /* Adjust the width as needed to align labels properly */
  text-align: right; /* Optional: Right-align the labels */
  margin-right: 10px; /* Optional: Add some spacing between the label and input */
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
  left: 550px; /* Adjust the value as needed */
}
.btn {

}


</style>