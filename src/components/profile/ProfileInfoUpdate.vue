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
import router from "@/router";

export default {
  name: 'ProfileInfoUpdate',

  data() {
    return {
      isEdit: false,
      userId: 0,
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
              userId: sessionStorage.getItem('userId')
            }
          }
      ).then(response => {
        this.$emit('event-update-profile-view')

      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    handleUserInfoUpdateRequest() {
      if (this.mandatoryFieldsAreFilled()) {
        this.sendUpdateUserInfoRequest()
      } else {
        this.$emit('event-update-error-message')
      }
    },

    mandatoryFieldsAreFilled() {
      let request = this.contactInfo
      return request.contactFirstName.length > 0 &&
          request.contactLastName.length > 0 &&
          request.contactEmail.length > 0
    }
  }
}
</script>