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
                <input v-model="confirmOldPassword" type="text" class="form-control" id="Vana parool">
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
                <input v-model="newPassword" type="text" class="form-control" id="Uus parool">
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
                <input v-model="confirmNewPassword" type="text" class="form-control" id="Kinnita uus parool">
              </div>
            </div>
          </div>
          <div class="margin-top 15px">
            <button @click="handlePasswordUpdateRequest" type="button" class="btn btn-secondary rounded-0">
              Muuda parool
            </button>
          </div>
          <button @click="back" type="button"
                  class="btn btn-outline-light shadow-sm rounded-0 mb-3 m-2">
            Tagasi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import {
  USER_INFO_UPDATE_ERROR, USER_NEW_PASSWORD_UPDATED_ERROR,
  USER_OLD_PASSWORD_UPDATED_ERROR,
  USER_PASSWORD_UPDATED
} from "@/assets/script/AlertMessage";
import router from "@/router";
import AlertDanger from '@/components/AlertDanger.vue'
import AlertSuccess from '@/components/AlertSuccess.vue'

export default {
  name: 'ChangePasswordView',
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      userId: '',
      oldPassword: '',
      newPassword: '',
      confirmOldPassword: '',
      confirmNewPassword: '',
      errorMessage: '',
      successMessage: ''
    }
  },

  methods: {
    mandatoryFieldsAreFilled() {
      return this.userId > 0 &&
          this.confirmOldPassword.length > 0 &&
          this.confirmNewPassword.length > 0 && this.newPassword.length > 0
    },

    differentOldPassword() {
      return this.oldPassword !== this.confirmOldPassword
    },

    differentNewPassword() {
      return this.newPassword !== this.confirmNewPassword
    },

    handlePasswordUpdateRequest() {
      if (!this.mandatoryFieldsAreFilled()) {
        this.errorMessage = USER_INFO_UPDATE_ERROR
      } else {
        this.differentOldPassword() ? this.errorMessage = USER_OLD_PASSWORD_UPDATED_ERROR : this.differentNewPassword() ?
            this.errorMessage = USER_NEW_PASSWORD_UPDATED_ERROR : this.updateUserPassword()
      }

    },

    getOldPassword() {
      this.$http.get("/user/password", {
            params: {
              userId: this.userId = Number(sessionStorage.getItem('userId')),
            }
          }
      ).then(response => {
        this.oldPassword = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    updateUserPassword() {
      this.$http.patch("/user/password", null, {
            params: {
              userId: this.userId,
              newPassword: this.newPassword
            }
          }
      ).then(response => {
        this.successMessage = USER_PASSWORD_UPDATED
        setTimeout(() => {
          router.push({name: 'profileRoute'})
        }, 1500)
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    back() {
      router.push({name: 'profileRoute'})
    }
  },

  mounted() {
    this.getOldPassword()
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



