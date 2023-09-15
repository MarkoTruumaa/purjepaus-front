<template>
  <div class="container">
    <h1>{{ harbourDetailedInfo.harbourName }} muutmine</h1>
    <div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Sadama nimi: </span>
        <input v-model="harbourDetailedInfo.harbourName" type="text" class="form-control"
               aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Maakond: </span>
        <input v-model="harbourDetailedInfo.countyName" type="text" class="form-control"
               aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">Sadama koordinaadid</span>
        <input v-model="harbourDetailedInfo.locationLongitude" type="text" class="form-control"
               placeholder="põhjapikkus">
        <input v-model="harbourDetailedInfo.locationLatitude" type="text" class="form-control" placeholder="lõunalaius">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Sissesõidu väikseim sügavus (meetrites): </span>
        <input v-model="harbourDetailedInfo.minDepth" type="text" class="form-control" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Sissesõidu väikseim laius (meetrites): </span>
        <input v-model="harbourDetailedInfo.minWidth" type="text" class="form-control" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Kapteni nimi: </span>
        <input v-model="captainInfo.firstName" type="text" class="form-control" aria-describedby="basic-addon1">
        <input v-model="captainInfo.firstName" type="text" class="form-control"
               placeholder="eesnimi">
        <input v-model="captainInfo.lastName" type="text" class="form-control" placeholder="perekonnanimi">
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Kohtade arv: </span>
        <input v-model="harbourDetailedInfo.spots" type="text" class="form-control" aria-describedby="basic-addon1">
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
import router from "@/router";

export default {
  name: 'EditHarbourView',
  isEdit: false,
  props: ['id'],

  data() {
    return {
      harbourDetailedInfo: {
        harbourId: 0,
        locationAddress: '',
        locationLongitude: 0,
        locationLatitude: 0,
        contactId: 0,
        countyName: '',
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
      captainInfo: {
        firstName: '',
        lastName: ''
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
        this.$http.get("/harbour/captain-info", {
          params: {
            contactId: response.data.contactId
          }
        }).then(response => {
          this.captainInfo = response.data
        }).catch(error => {
          this.errorResponse = error.response.data
        })
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