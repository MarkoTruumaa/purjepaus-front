<template>
  <div>
    <div class="container p-4 glass-background">
      <div class="container text-center">
        <h1>Parooli muutmine</h1>
        <div class="align-content-center">
          <div class="row justify-content-center">
            <div class="col col-4">
              <AlertDanger :alert-message="errorMessage"/>
              <AlertSuccess :alert-message="successMessage"/>
            </div>
          </div>
        </div>
        <div class="container text-center">
          <div class="mb-3">
            <div class="row">
              <div class="col">
                <label for="Vana parool" class="form-label">Vana parool
                  <font-awesome-icon :icon="['fas', 'asterisk']"/>
                </label>
              </div>
              <div class="col">
                <input v-model="oldPassword" type="text" class="form-control" id="Vana parool">
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="row">
              <div class="col">
                <label for="Uus parool" class="form-label">Uus parool
                  <font-awesome-icon :icon="['fas', 'asterisk']"/>
                </label>
              </div>
              <div class="col">
                <input v-model="userData.newPassword" type="text" class="form-control" id="Uus parool">
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="row">
              <div class="col">
                <label for="Kinnita uus parool" class="form-label">Kinnita uus parool
                  <font-awesome-icon :icon="['fas', 'asterisk']"/>
                </label>
              </div>
              <div class="col">
                <input v-model="confirmPassword" type="text" class="form-control" id="Kinnita uus parool">
              </div>
            </div>
          </div>
          <div class="margin-top 15px">
            <button @click="handlePasswordUpdateRequest" type="button" class="btn btn-secondary rounded-0">
              Muuda parool
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {USER_INFO_UPDATE_ERROR, USER_PASSWORD_UPDATED} from "@/assets/script/AlertMessage";
import router from "@/router";
import AlertDanger from '@/components/AlertDanger.vue'
import AlertSuccess from '@/components/AlertSuccess.vue'

export default {
  name: 'ChangePasswordView',
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      userData: {
        userId: null,
        newPassword: ''
      },
      confirmPassword: '',
      errorMessage: '',
      successMessage: ''
    }
  },

  methods: {
    mandatoryFieldsAreFilled() {
      const userId = sessionStorage.getItem('userId')
      return userId > 0 &&
          this.userData.newPassword.length > 0 &&
          this.confirmPassword > 0
    },

    handlePasswordUpdateRequest() {
      if (!this.mandatoryFieldsAreFilled()) {
        this.errorMessage = USER_INFO_UPDATE_ERROR
      } else {
        this.updateUserPassword()
      }

    },

    updateUserPassword() {
      const patchData = {
        userId: Number(sessionStorage.getItem('userId')),
        newPassword: this.userData.newPassword
      }
      this.$http.patch('user/password', patchData, {
        params: patchData
      }).then(response => {
        this.successMessage = USER_PASSWORD_UPDATED
        setTimeout(() => {router.push({name: 'loginRoute'})}, 1500)

      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    }
  }
}


</script>


<style scoped>
.row {
  width: 500px;
  columns: auto;
  align-items: center;
}

.col {
  position: relative;
  left: 275px;
}
</style>



