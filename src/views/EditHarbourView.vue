<template>
  <div class="container">
    <h1>{{ harbourDetailedInfo.harbourName }} muutmine</h1>
    <div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Sadama nimi: {{ harbourDetailedInfo.harbourName }} </span>
        <input type="text" class="form-control" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">Maakond
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Harju</a></li>
        </ul>
        <input type="text" class="form-control" aria-label="Text input with dropdown button">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">Sadama koordinaadid {{
            harbourDetailedInfo.locationLongitude
          }} {{ harbourDetailedInfo.locationLatitude }}</span>
        <input type="text" class="form-control" placeholder="põhjapikkus">
        <input type="text" class="form-control" placeholder="lõunalaius">
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">Sissesõidu väikseim sügavus: {{ harbourDetailedInfo.minDepth }}
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Mingi sügavus</a></li>
        </ul>
        <input type="text" class="form-control" aria-label="Text input with dropdown button">
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">Sissesõidu väikseim laius: {{ harbourDetailedInfo.minWidth }}
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Mingi laius</a></li>
        </ul>
        <input type="text" class="form-control" aria-label="Text input with dropdown button">
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">Kapteni nimi
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Mingi kapteni nimi</a></li>
        </ul>
        <input type="text" class="form-control" aria-label="Text input with dropdown button">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect01">Kohtade arv: {{ harbourDetailedInfo.spots }} </label>
        <select class="form-select" id="inputGroupSelect01">
          <option selected>Vali...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="container">
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-secondary">Muuda kontakt</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-secondary">Muuda teenused</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-secondary">Lisa / muuda pilt</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-danger">Muuda sadamat</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary">Tagasi</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditHarbourView',
  isEdit: false,
  props: ['id'],
  data() {
    return {
      harbourDetailedInfo:
          {
            harbourId: 0,
            locationAddress: '',
            locationLongitude: 0,
            locationLatitude: 0,
            contactId: 0,
            harbourName: '',
            homepage: '',
            navigationStart: '',
            navigationEnd: '',
            minDepth: 0,
            minWidth: 0,
            spots: 0,
            phoneNumber: '',
            extras: [
              {
                extraId: 0,
                extraName: '',
                isAvailable: true
              }
            ],
            pictures: [
              {
                pictureId: 0,
                pictureData: ''
              }
            ]
          },

    }
  },
  methods: {
    getHarbourDetailedInfo() {
      this.$http.get('/harbour', {
            params: {
              harbourId: this.id
            }
          }
      ).then(response => {
        this.harbourDetailedInfo = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },
    sendUpdateHarbourInfoRequest() {
      this.$http.patch("/harbour", this.harbourDetailedInfo, {
            params: {
              harbourId: this.harbourId
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


  },
  mounted() {
    this.getHarbourDetailedInfo()
  }
}

</script>