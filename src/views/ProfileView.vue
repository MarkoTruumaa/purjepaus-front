<template>
  <h1>{{ contactInfo.userName }} profiil</h1>
  <div class="align-content-center">
    <div class="card card-w-margin">
      <ProfileInfo v-if="isView" :contact-info="contactInfo"/>
      <ProfileInfoUpdate ref="profileInfoUpdateRef"/>
    </div>
  </div>

  <div class="text-center">
    <button v-if="isView" @click="displayProfileInfoUpdateComponent" type="button" class="btn btn-warning">Muuda andmeid</button>
    <button v-if="!isView" @click="updateUserInfo" type="button" class="btn btn-warning">Uuenda</button>
  </div>
</template>


<script>
import router from "@/router";
import ProfileInfo from "@/components/profile/ProfileInfo.vue";
import ProfileInfoUpdate from "@/components/profile/ProfileInfoUpdate.vue";

export default {
  name: 'ProfileView',
  components: {ProfileInfoUpdate, ProfileInfo},

  data() {
    return {
      isView: true,
      contactInfo: {
        username: 'jaan',
        contactFirstName: 'Jaan',
        contactLastName: 'Suur',
        contactEmail: 'jaan@mail.ee',
        contactTelephone: '+37256584612',
        contactAddress: 'Teine koht 15, Tallinn'
      },

      userId: 1,

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

    updateUserInfo() {
      this.$refs.profileInfoUpdateRef.sendUpdateUserInfoRequest()
    },

    displayProfileInfoUpdateComponent() {
      this.$refs.profileInfoUpdateRef.userId = this.userId
      this.$refs.profileInfoUpdateRef.contactInfo = this.contactInfo
      this.$refs.profileInfoUpdateRef.isEdit = true
      this.isView = false


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