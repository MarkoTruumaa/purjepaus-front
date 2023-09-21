<template>
  <div class="container p-4 glass-background">
    <h1>Kasutaja {{ contactInfo.username }} profiil</h1>
    <div class="align-content-center">
      <div class="row justify-content-center">
        <div class="col col-4">
          <AlertDanger :alert-message="errorMessage"/>
          <AlertSuccess :alert-message="successMessage"/>
        </div>
      </div>
      <div class="card card-w-margin">
        <ProfileInfo v-if="isView" :contact-info="contactInfo" ref="profileInfoRef"/>
        <ProfileInfoUpdate
            @event-update-error-message="displayMessage"
            @event-update-profile-view="displayProfileInfoComponent"
            ref="profileInfoUpdateRef"
        />
      </div>
    </div>

    <div class="text-center">
      <button
          v-if="isView"
          @click="displayProfileInfoUpdateComponent"
          type="button"
          class="btn btn-warning"
      >
        Muuda andmeid
      </button>
      <div>
        <div class="mb-1">
          <button v-if="isView" @click="displayChangePasswordView" type="button" class="btn btn-danger">
            Muuda parooli
          </button>
        </div>
      </div>
      <div>
        <button v-if="!isView" @click="updateUserInfo" type="button" class="btn btn-warning">
          Uuenda
        </button>
      </div>
      <div>
        <button v-if="isView" @click="displayCreateNewUserView" type="button" class="btn btn-warning">
          Loo uus kasutaja
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import ProfileInfoUpdate from '@/components/profile/ProfileInfoUpdate.vue'
import AlertDanger from '@/components/AlertDanger.vue'
import {USER_INFO_UPDATE_ERROR, USER_INFO_UPDATED} from '@/assets/script/AlertMessage'
import AlertSuccess from '@/components/AlertSuccess.vue'
import createNewUserView from "@/views/CreateNewUserView.vue";

export default {
  name: 'ProfileView',
  computed: {
    createNewUserView() {
      return createNewUserView
    }
  },
  components: {AlertSuccess, AlertDanger, ProfileInfoUpdate, ProfileInfo},

  data() {
    return {
      isView: true,
      errorMessage: '',
      successMessage: '',
      contactInfo: {
        username: '',
        contactFirstName: '',
        contactLastName: '',
        contactEmail: '',
        contactTelephone: '',
        contactAddress: '',
      },
    }
  },

  methods: {

    displayChangePasswordView() {
      router.push({name: 'changePasswordRoute'})

    },

    getUserInfo() {
      this.$http
          .get('/user', {
            params: {
              userId: sessionStorage.getItem('userId'),
            },
          })
          .then((response) => {
            this.contactInfo = response.data
          })
          .catch((error) => {
            router.push({name: 'errorRoute'})
          })
    },

    displayCreateNewUserView() {
      router.push({name: 'createNewUserRoute'})
    },

    updateUserInfo() {
      this.errorMessage = ''
      this.$refs.profileInfoUpdateRef.handleUserInfoUpdateRequest()
    },

    displayProfileInfoUpdateComponent() {
      this.$refs.profileInfoUpdateRef.userId = this.userId
      this.$refs.profileInfoUpdateRef.contactInfo = this.contactInfo
      this.$refs.profileInfoUpdateRef.isEdit = true
      this.isView = false
    },

    displayMessage() {
      this.errorMessage = USER_INFO_UPDATE_ERROR
    },

    displayProfileInfoComponent() {
      this.successMessage = USER_INFO_UPDATED
      setTimeout(() => {
        this.successMessage = ''
        this.getUserInfo()
        this.$refs.profileInfoUpdateRef.isEdit = false
        this.isView = true
      }, 2500)
    },
  },

  mounted() {
    this.successMessage = ''
    this.getUserInfo()
  },
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
