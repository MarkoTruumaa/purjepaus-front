<template>
  <div v-if="isEdit">
    <h1>Oleme editis</h1>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">contactFirstName</label>
      <input v-model="contactInfo.contactFirstName" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">contactLastName</label>
      <input v-model="contactInfo.contactLastName" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">contactEmail</label>
      <input v-model="contactInfo.contactEmail" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">contactAddress</label>
      <input v-model="contactInfo.contactAddress" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">contactTelephone</label>
      <input v-model="contactInfo.contactTelephone" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
  </div>
</template>
<script>
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
              userId: this.userId
            }
          }
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        const responseBody = response.data
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        const errorResponseBody = error.response.data
      })
    },


  }
}
</script>