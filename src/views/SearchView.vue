<template>
  <div class="container">
    <h1>Täpne sadamaotsing</h1>
    <div class="row">
      <div class="col">
        <table class="table table-borderless">
          <tbody>
          <tr>
            <td>
              <div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                  Kõik maakonnad
                </button>
                <ul class="dropdown-menu">
                  <li><a v-for="county in countyInfo"  :key="county.countyId"
                    class="dropdown-item"
                    href="#">
                    {{ countyInfo.countyName }}
                    </a></li>
                </ul>

              </div>

              <div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                  Sissesõidu väikseim sügavus
                </button>
                <ul class="dropdown-menu">
                  <li><a v-for="number in numbers" :key="number" class="dropdown-item" href="#">{{ number }} meetrit</a>
                  </li>
                </ul>
              </div>
            </td>

          </tr>
          <tr>
            <td>
              <div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                  Sissesõidu väikseim laius
                </button>
                <ul class="dropdown-menu">
                  <li><a v-for="number in numbers" :key="number" class="dropdown-item" href="#">{{ number }} meetrit</a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div><h3>TEENUSED</h3></div>
      <table class="table table-borderless col-6 ">
        <tbody>
        <tr>
          <td>
            <div class="form-check">
              <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault" v-for="extra in extraInfo"  :key="extra.extraId">
                  {{ extraInfo.extraName }}
              </label>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
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
  },
}


</script>
