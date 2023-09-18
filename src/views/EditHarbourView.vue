<template>
  <div>

    <div class="container">

      <h1>{{ harbourDetailedInfo.harbourName }} muutmine</h1>
      <div>
        <div class="input-group mb-3">
          <span class="input-group-text">Sadama nimi: </span>
          <input v-model="harbourDetailedInfo.harbourName" type="text" class="form-control"
                 aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Maakond: </span>
          <select v-model="selectedCountyId" class="form-select" aria-label="Default select example">
            <option v-for="county in countyInfo" :value="county.countyId" :key="county.countyId">
              {{ county.countyName }}
            </option>
          </select>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Sadama koordinaadid</span>
          <input v-model="harbourDetailedInfo.locationLongitude" type="number" class="form-control"
                 placeholder="põhjapikkus" step="0.000001">
          <input v-model="harbourDetailedInfo.locationLatitude" type="number" class="form-control"
                 placeholder="lõunalaius" step="0.000001">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="depth-input">Sissesõidu väikseim sügavus (meetrites): </span>
          <input v-model="harbourDetailedInfo.minDepth" type="number" step="0.1" class="form-control"
                 aria-describedby="depth-input">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Sissesõidu väikseim laius (meetrites): </span>
          <input v-model="harbourDetailedInfo.minWidth" type="number" step="0.1" class="form-control"
                 aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Kapteni nimi: </span>

          <input v-model="captainInfo.firstName" disabled type="text" class="form-control"
                 placeholder="eesnimi">
          <input v-model="captainInfo.lastName" disabled type="text" class="form-control" placeholder="perekonnanimi">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Kohtade arv: </span>
          <input v-model="harbourDetailedInfo.spots" type="number" class="form-control" aria-describedby="basic-addon1">
        </div>
        <div>
          <div>
            <h4>Kontaktinfo muutmine</h4>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Muuda aadressi: </span>
            <input v-model="harbourDetailedInfo.locationAddress" type="text" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Muuda telefoninumber: </span>
            <input v-model="harbourDetailedInfo.phoneNumber" type="text" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Muuda navigatsiooniperioodi algus: </span>
            <input v-model="harbourDetailedInfo.navigationStart" type="date" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Muuda navigatsiooniperioodi lõpp: </span>
            <input v-model="harbourDetailedInfo.navigationEnd" type="date" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Muuda/lisa sadama koduleht: </span>
            <input v-model="harbourDetailedInfo.homepage" type="text" class="form-control">
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col">
              <button  type="button" class="btn btn-secondary">Muuda kontakt</button>
            </div>

            <div class="col">
              <button @click="sendUpdateHarbourInfoRequest" type="button" class="btn btn-success">Muuda sadamat</button>
            </div>
            <div class="col">
              <button type="button" class="btn btn-primary">Tagasi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'EditHarbourView',
  components: {Modal},
  props: ['id'],

  data() {
    return {
      isEdit: false,
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
      countyInfo: [{
        countyId: 0,
        countyName: ''
      }],
      captainInfo: {
        firstName: '',
        lastName: ''
      },
      selectedCountyId: 0,
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
        const initialCounty = this.countyInfo.find(county => {
          return county.countyName === response.data.countyName;
        });
        this.selectedCountyId = initialCounty.countyId;
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
    getCountyInfo() {
      this.$http.get("/counties"
      ).then(response => {
        this.countyInfo = response.data;
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    createEditBody() {
      return {
        locationCountyId: this.selectedCountyId,
        locationAddress: this.harbourDetailedInfo.locationAddress,
        locationLongitude: this.harbourDetailedInfo.locationLongitude,
        locationLatitude: this.harbourDetailedInfo.locationLatitude,
        contactId: this.harbourDetailedInfo.contactId,
        harbourName: this.harbourDetailedInfo.harbourName,
        homepage: this.harbourDetailedInfo.homepage,
        navigationStart: this.harbourDetailedInfo.navigationStart,
        navigationEnd: this.harbourDetailedInfo.navigationEnd,
        minDepth: this.harbourDetailedInfo.minDepth,
        minWidth: this.harbourDetailedInfo.minWidth,
        spots: this.harbourDetailedInfo.spots,
        phoneNumber: this.harbourDetailedInfo.phoneNumber,
      };
    },
    sendUpdateHarbourInfoRequest() {
      this.$http.put("/harbour", this.createEditBody(), {
            params: {
              harbourId: this.harbourId
            },
          }
      ).then(response => {
        // Siit saame kätte JSONi  ↓↓↓↓↓↓↓↓
        const responseBody = response.data
      }).catch(error => {
        // Siit saame kätte errori JSONi  ↓↓↓↓↓↓↓↓
        const errorResponseBody = error.response.data
      })
    },
    openContactInfoModal() {
      this.$refs.contactInfoModalRef.openModal()
    }

  },
  mounted() {
    this.getHarbourDetailedInfo()
  },
  beforeMount() {
    this.getCountyInfo()
  }
}

</script>