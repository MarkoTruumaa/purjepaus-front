<template>
  <div class="container p-4 glass-background">
    <div class="container" style="background-color: transparent">
      <h1>Täpne sadamaotsing</h1>
      <div class="container">
        <div class="card-body">
          <div>
            <div class="row justify-content-center">
              <div class="col col-4">
                <select v-model="searchInfo.countyId" class="form-select mb-3" aria-label="Default select example">
                  <option selected :value="0">Kõik maakonnad</option>
                  <option
                      v-for="county in countyInfo"
                      :value="county.countyId"
                      :key="county.countyId"
                  >
                    {{ county.countyName }}
                  </option>
                </select>
                <select v-model="searchInfo.minDepth" class="form-select mb-3" aria-label="Default select example">
                  <option selected :value="0">Sissesõidu väikseim sügavus</option>
                  <option v-for="(number, index) in numbers" :key="number" :value="index">
                    {{ number }} meetrit
                  </option>
                </select>
                <select v-model="searchInfo.minWidth" class="form-select" aria-label="Default select example">
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
              <div v-for="extra in extraInfo" :key="extraInfo.extraId" class="col-4 form-check d-flex">
                <input v-model="extra.isAvailable" class="form-check-input" type="checkbox"/>
                <label class="form-check-label ps-2">
                  {{ extra.extraName }}
                </label>
              </div>
            </div>
            <div class="p-4">
              <button @click="sendHarbourSearchInfo" type="button" class="row btn btn-success rounded-0">OTSI</button>
            </div>
          </div>
        </div>
        <div v-if="true" class="row">
          <HarboursTable :harbours-main-info="harboursMainInfo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import HarboursTable from "@/components/HarboursTable.vue";

export default {
  name: 'SearchView',
  components: {HarboursTable},
  computed: {
    numbers() {
      return Array.from({length: 10}, (_, index) => index + 0.3)
    },
  },
  data() {
    return {
      countyInfo: {
        countyId: 0,
        countyName: '',
      },
      extraInfo: [
        {
          extraId: 0,
          extraName: '',
          isAvailable: true,
        }
      ],
      searchInfo: {
        countyId: 0,
        minDepth: 0,
        minWidth: 0,
        extras: [
          {
            extraId: 0,
            extraName: '',
            isAvailable: false
          }
        ]
      },
      harboursMainInfo: [
        {
          harbourId: 0,
          harbourName: '',
          locationLongitude: 0,
          locationLatitude: 0,
          minDepth: 0,
          minWidth: 0,
          spots: 0,
        },
      ],
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
            router.push({name: 'errorRoute'})
          })
    },
    getCountyInfo() {
      this.$http
          .get('/counties')
          .then((response) => {
            this.countyInfo = response.data
          })
          .catch((error) => {
            router.push({name: 'errorRoute'})
          })
    },

    sendHarbourSearchInfo() {
      this.updateExtrasInSearchInfo()
      this.$http.post("/harbours/search", this.searchInfo
      ).then(response => {
        this.harboursMainInfo = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    updateExtrasInSearchInfo() {
      this.searchInfo.extras = this.extraInfo
    },


  },
  beforeMount() {
    this.getExtraInfo()
    this.getCountyInfo()
  },
}
</script>
