<template>
  <div class="container p-4 glass-background">
    <h1>Kasutaja {{ contactInfo.username }} profiil</h1>
    <div class="align-content-center">
      <div class="row justify-content-center">
        <div class="col col-4">
          <AlertDanger :alert-message="errorMessage" />
          <AlertSuccess :alert-message="successMessage" />
        </div>
      </div>
      <div class="card card-w-margin">
        <ProfileInfo v-if="isView" :contact-info="contactInfo" ref="profileInfoRef" />
        <ProfileInfoUpdate
          @event-update-error-message="displayMessage"
          @event-update-profile-view="displayProfileInfoComponent"
          ref="profileInfoUpdateRef"
        />
      </div>
    </div>

    <div class="text-center">
      <div class="mb-3">
      <button
        v-if="isView"
        @click="displayProfileInfoUpdateComponent"
        type="button" class="btn btn-secondary rounded-0">
        Muuda andmeid
      </button>
      </div>
      <div>
        <div class="mb-2">
          <button v-if="isView" @click="displayChangePasswordView" type="button" class="btn btn-secondary rounded-0">
            Muuda parooli
          </button>
        </div>
      </div>
      <div>
        <div class="mb-3">
        <button v-if="!isView" @click="updateUserInfo" type="button" class="btn btn-secondary rounded-0">
          Uuenda
        </button>
        </div>
      </div>
      <div>
        <button v-if="!isView" @click="back" type="button"
                class="btn btn-outline-light shadow-sm rounded-0 mb-3 m-2">
          Tagasi
        </button>
      </div>
      <div>
        <button v-if="isView && isAdmin" @click="displayCreateNewUserView" type="button" class="btn btn-secondary rounded-0">
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
      isAdmin: false,
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
          router.push({ name: 'errorRoute' })
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

    checkUserRole() {
      if (sessionStorage.getItem('roleName') === 'admin') {
        this.isAdmin = true
      }
    },
    back() {
      this.isView = true
      this.$refs.profileInfoUpdateRef.isEdit = false
    },
  },

  mounted() {
    this.successMessage = ''
    this.getUserInfo()
    this.checkUserRole()
  },
}
</script>

<style>
.card-w-margin {
  width: 18rem;
  margin: auto;
  margin-bottom: 1em;
  margin-top: 2em;
}

button {
  margin: auto;

}
</style>
