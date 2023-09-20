<template>
  <div class="container p-4 glass-background">
    <div class="container" style="background-color: transparent">
      <h1>Täpne sadamaotsing</h1>
      <div class="container">
        <div class="card-body">
          <div>
            <div class="row justify-content-center">
              <div class="col col-4">
                <select class="form-select mb-3" aria-label="Default select example">
                  <option selected :value="0">Kõik maakonnad</option>
                  <option
                    v-for="county in countyInfo"
                    :value="county.countyId"
                    :key="county.countyId"
                  >
                    {{ county.countyName }}
                  </option>
                </select>
                <select class="form-select mb-3" aria-label="Default select example">
                  <option selected :value="0">Sissesõidu väikseim sügavus</option>
                  <option v-for="(number, index) in numbers" :key="number" :value="index">
                    {{ number }} meetrit
                  </option>
                </select>
                <select class="form-select" aria-label="Default select example">
                  <option selected :value="0">Sissesõidu väikseim laius</option>
                  <option v-for="(number, index) in numbers" :key="number" :value="index">
                    {{ number }} meetrit
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="container p-4" style="background-color: transparent">
            <h3>TEENUSED</h3>

            <div class="row justify-content-start">
              <div v-for="extra in extraInfo" class="col-4 form-check d-flex">
                <input class="form-check-input" type="checkbox" value="" :id="extra.extraName" />
                <label class="form-check-label ps-2" :for="extra.extraName">
                  {{ extra.extraName }}
                </label>
              </div>
            </div>
            <div class="p-4">
              <button type="button" class="row btn btn-success rounded-0">OTSI</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'SearchView',
  computed: {
    numbers() {
      return Array.from({ length: 10 }, (_, index) => index + 0.5)
    },
  },
  data() {
    return {
      countyInfo: {
        countyId: 0,
        countyName: '',
      },
      extraInfo: {
        extraId: 0,
        extraName: '',
        isAvailable: true,
      },
    }
  },
  methods: {
    getExtraInfo() {
      this.$http
        .get('/harbour/extras')
        .then((response) => {
          this.extraInfo = response.data
        })
        .catch((error) => {
          router.push({ name: 'errorRoute' })
        })
    },
    getCountyInfo() {
      this.$http
        .get('/counties')
        .then((response) => {
          this.countyInfo = response.data
        })
        .catch((error) => {
          router.push({ name: 'errorRoute' })
        })
    },
  },
  beforeMount() {
    this.getExtraInfo()
    this.getCountyInfo()
  },
}
</script>
