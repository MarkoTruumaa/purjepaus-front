<template>
  <div class="container">
    <h1>Täpne sadamaotsing</h1>
    <div class="row">
      <div class="col">
        <table class="table table-borderless">
          <tbody>
          <tr>
            <td>
              <div class="row justify-content-center">
                <div class="col col-4">
                  <select class="form-select mb-3" aria-label="Default select example">
                    <option selected :value="0">Kõik maakonnad</option>
                    <option v-for="county in countyInfo" :value="county.countyId" :key="county.countyId">
                      {{ county.countyName }}
                    </option>
                  </select>
                  <select class="form-select mb-3" aria-label="Default select example">
                    <option selected :value="0">Sissesõidu väikseim sügavus</option>
                    <option v-for="(number, index) in numbers" :key="number" :value="index">{{ number }} meetrit
                    </option>
                  </select>
                  <select class="form-select" aria-label="Default select example">
                    <option selected :value="0">Sissesõidu väikseim laius</option>
                    <option v-for="(number, index) in numbers" :key="number" :value="index">{{ number }} meetrit
                    </option>
                  </select>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div><h3>TEENUSED</h3></div>
      <div class="col">
        <table class="table table-borderless">
          <tbody>
          <tr>
            <td>
              <div class="row justify-content-center">
                <div v-for="extra in extraInfo" class="col col-4 form-check">
                  <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    {{ extra.extraName }}
                  </label>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button type="button" class="btn btn-success">OTSI</button>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'SearchView',
  computed: {
    numbers() {
      return Array.from({length: 10}, (_, index) => index + 0.5);
    },
  },
  data() {
    return {
      countyInfo: {
        countyId: 0,
        countyName: ''
      },
      extraInfo: {
        extraId: 0,
        extraName: '',
        isAvailable: true
      }
    }
  },
  methods: {
    getExtraInfo() {
      this.$http.get("/harbour/extras"
      ).then(response => {
        this.extraInfo = response.data;
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    getCountyInfo() {
      this.$http.get("/counties"
      ).then(response => {
        this.countyInfo = response.data;
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
  },
  beforeMount() {
    this.getExtraInfo()
    this.getCountyInfo()
  }
}


</script>
