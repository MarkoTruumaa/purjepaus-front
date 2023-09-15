<template>
  <div v-if="isEdit">
    <h1>Muuda andmeid</h1>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Eesnimi</label>
      <input v-model="contactInfo.contactFirstName" type="email" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Perekonnanimi</label>
      <input v-model="contactInfo.contactLastName" type="email" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">E-mail</label>
      <input v-model="contactInfo.contactEmail" type="email" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Aadress</label>
      <input v-model="contactInfo.contactAddress" type="email" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Telefon</label>
      <input v-model="contactInfo.contactTelephone" type="email" class="form-control" id="exampleInputEmail1"
             aria-describedby="emailHelp">
    </div>
  </div>
</template>
<script>
import {USER_INFO_UPDATE_ERROR, USER_INFO_UPDATED} from "@/assets/script/AlertMessage";

export default {
  name: 'ProfileInfoUpdate',
  data() {
    return {
      isEdit: false,
      userId: 0,
      successMessage: '',
      errorMessage: '',
      contactInfo: {
        username: '',
        contactFirstName: '',
        contactLastName: '',
        contactEmail: '',
        contactTelephone: '',
        contactAddress: ''
      },
    }
  },
  methods: {
    sendUpdateUserInfoRequest() {

      this.$http.patch("user", this.contactInfo, {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.handleUserInfoUpdateRequest()

      }).catch(error => {
        this.handleUserInfoUpdateErrorResponse()
      })
    },

    handleUserInfoUpdateRequest() {
      if (this.mandatoryFieldsAreFilled()) {
        this.successMessage = USER_INFO_UPDATED

      } else {
        this.errorMessage = USER_INFO_UPDATE_ERROR
      }

    },

    handleUserInfoUpdateErrorResponse() {
      this.errorMessage = USER_INFO_UPDATE_ERROR


    },
    mandatoryFieldsAreFilled() {
      let request = this.contactInfo
      return request.contactFirstName.length > 0 &&
          request.contactLastName.length > 0 &&
          request.contactEmail > 0

    }


  }
}
</script>