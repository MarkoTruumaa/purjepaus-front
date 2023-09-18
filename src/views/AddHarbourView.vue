<template>
  <div>
    <AddExtrasModal ref="addExtrasModalRef"/>
    <AddContactInfoModal ref="addContactInfoModalRef"/>
    <div class="container">
      <h1>Sadama lisamine</h1>
      <div>
        <div class="input-group mb-3">
          <span class="input-group-text">Sadama nimi: </span>
          <input v-model="harbourDetailedInfo.harbourName" type="text" class="form-control"
                 aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <select class="form-select mb-3" aria-label="Default select example">
            <option selected :value="0">Kõik maakonnad</option>
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

          <input  disabled type="text" class="form-control"
                 placeholder="eesnimi">
          <input  disabled type="text" class="form-control" placeholder="perekonnanimi">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Kohtade arv: </span>
          <input v-model="harbourDetailedInfo.spots" type="number" class="form-control" aria-describedby="basic-addon1">
        </div>
        <div>
          <div>
            <h4>
              Kontaktandmete muutmine
            </h4>
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
        <div>
          <div class="input-group mb-3">
            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon03">Sadama pildi lisamine
            </button>
            <input type="file" class="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03"
                   aria-label="Upload">
          </div>

        </div>


        <div class="container">
          <div class="row">
            <div class="col">
              <button @click="openAddContactInfoModal" type="button" class="btn btn-secondary">Lisa kontakt</button>
            </div>
            <div class="col">
              <button @click="openAddExtrasModal" type="button" class="btn btn-secondary">Lisa teenused</button>
            </div>
            <div class="col">
              <button @click="sendAddNewHarbourInfoRequest" type="button" class="btn btn-success">Lisa sadam</button>
            </div>
            <div class="col">
              <button @click="moveToHarboursPage" type="button" class="btn btn-primary">Tagasi sadamate lehele</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import AddExtrasModal from "@/components/modal/AddExtrasModal.vue";
import AddContactInfoModal from "@/components/modal/AddContactInfoModal.vue";

export default {
  name: 'AddHarbourView',
  components: {AddExtrasModal, AddContactInfoModal},
  data() {
    return {
      extraInfo: {
        extraId: 0,
        extraName: '',
        isAvailable: true
      },
      countyInfo: [{
        countyId: 0,
        countyName: ''
      }],
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
        ],
      },
      selectedCountyId: 0,
    }
  },
  methods: {
    getHarbourDetailedInfo() {
      this.$http.get('/harbour', {}).then(response => {
        this.harbourDetailedInfo = response.data
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
    openAddContactInfoModal() {
      this.$refs.addContactInfoModalRef.openModal()
    },
    getExtrasInfo() {
      this.$http.get("/harbour/extras"
      ).then(response => {
        this.extraInfo = response.data;
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },
    openAddExtrasModal() {
      this.$refs.addExtrasModalRef.openModal({
        extraId: this.extraInfo.extraId
      });
    },
    moveToHarboursPage() {
      router.push({name: 'harboursRoute'})
    },
    sendAddNewHarbourInfoRequest(){
      this.$http.post("/harbour", this.harbourDetailedInfo,
      ).then(response => {
        const responseBody = response.data

      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },
  },
  mounted() {
    this.getHarbourDetailedInfo()
    this.getExtrasInfo()
    this.getCountyInfo()
  }
}

</script>