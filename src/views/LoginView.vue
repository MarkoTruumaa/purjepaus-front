<template>
  <div class="container p-4 glass-background">
    <div class="container text-center">
      <h1>Sisse logimine</h1>
      <div class="row justify-content-center">
        <div class="col">
          <AlertDanger :alert-message="errorResponse.message" />
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-3 form-floating mb-4">
          <div class="form-floating mb-3">
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Kasutajanimi</label>
          </div>
          <div class="form-floating">
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Parool</label>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-3 form-floating mb-3">
          <div class="mb-4">
            <button @click="login" type="button" class="btn btn-secondary rounded-0">
              Logi sisse
            </button>
          </div>
          <div class="mb-5">
            <button @click="changeView" type="button" class="btn btn-secondary rounded-0">
              Loo uus kasutaja
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import AlertDanger from '@/components/AlertDanger.vue'

export default {
  name: 'LoginView',
  components: { AlertDanger },
  data() {
    return {
      username: '',
      password: '',
      loginResponse: {
        userId: 0,
        roleName: '',
      },
      errorResponse: {
        message: '',
        errorCode: 0,
      },
    }
  },
  methods: {
    login() {
      this.resetErrorMessage()
      if (this.username.length > 0 && this.password.length > 0) {
        this.sendLoginRequest()
      } else {
        this.errorResponse.message = 'Täida kõik väljad'
      }
    },

    resetErrorMessage() {
      this.errorResponse.message = ''
    },

    sendLoginRequest() {
      this.$http
        .get('/login', {
          params: {
            username: this.username,
            password: this.password,
          },
        })
        .then((response) => {
          this.loginResponse = response.data
          sessionStorage.setItem('userId', this.loginResponse.userId)
          sessionStorage.setItem('roleName', this.loginResponse.roleName)
          this.$emit('event-update-nav-menu')
          router.push({ name: 'homeRoute' })
        })
        .catch((error) => {
          this.errorResponse = error.response.data
          if (this.errorResponse.errorCode !== 111) {
            router.push({ name: 'errorRoute' })
          }
        })
    },

    changeView() {
      router.push({ name: 'createNewUserRoute' })
    },
  },
}
</script>
