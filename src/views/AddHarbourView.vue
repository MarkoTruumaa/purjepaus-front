<template>
  <div class="container p-4 glass-background">
    <AddExtrasModal ref="addExtrasModalRef" />
    <div class="container">
      <h1>Sadama lisamine</h1>
      <div class="col col-4">
        <AlertDanger :alert-message="errorMessage" />
        <AlertSuccess :alert-message="successMessage" />
      </div>
      <div>
        <div class="input-group mb-3">
          <span class="input-group-text">Sadama nimi: </span>
          <input
            v-model="harbourDetailedInfo.harbourName"
            type="text"
            class="form-control"
            aria-describedby="basic-addon1"
          />
        </div>
        <div class="input-group mb-3">
          <select
            v-model="selectedCountyName"
            class="form-select mb-3"
            aria-label="Default select example"
          >
            <option>Kõik maakonnad</option>
            <option v-for="county in countyInfo" :value="county.countyName" :key="county.countyId">
              {{ county.countyName }}
            </option>
          </select>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Sadama koordinaadid</span>
          <input
            v-model="harbourDetailedInfo.locationLongitude"
            type="number"
            class="form-control"
            placeholder="põhjapikkus"
            step="0.000001"
          />
          <input
            v-model="harbourDetailedInfo.locationLatitude"
            type="number"
            class="form-control"
            placeholder="lõunalaius"
            step="0.000001"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="depth-input"
            >Sissesõidu väikseim sügavus (meetrites):
          </span>
          <input
            v-model="harbourDetailedInfo.minDepth"
            type="number"
            step="0.1"
            class="form-control"
            aria-describedby="depth-input"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"
            >Sissesõidu väikseim laius (meetrites):
          </span>
          <input
            v-model="harbourDetailedInfo.minWidth"
            type="number"
            step="0.1"
            class="form-control"
            aria-describedby="basic-addon1"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Kapteni nimi: </span>
          <select
            v-model="selectedCaptainContactId"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected :value="0">Vali kapten</option>
            <option
              v-for="captain in captainInfo"
              :value="captain.contactId"
              :key="captain.contactId"
            >
              {{ captain.contactFirstName }} {{ captain.contactLastName }}
            </option>
          </select>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Kohtade arv: </span>
          <input
            v-model="harbourDetailedInfo.spots"
            type="number"
            class="form-control"
            aria-describedby="basic-addon1"
          />
        </div>
        <div>
          <div>
            <h4>Kontaktandmed</h4>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Muuda aadressi: </span>
            <input v-model="harbourDetailedInfo.locationAddress" type="text" class="form-control" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Muuda telefoninumber: </span>
            <input v-model="harbourDetailedInfo.phoneNumber" type="text" class="form-control" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"
              >Muuda navigatsiooniperioodi algus:
            </span>
            <input v-model="harbourDetailedInfo.navigationStart" type="date" class="form-control" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"
              >Muuda navigatsiooniperioodi lõpp:
            </span>
            <input v-model="harbourDetailedInfo.navigationEnd" type="date" class="form-control" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Muuda/lisa sadama koduleht: </span>
            <input v-model="harbourDetailedInfo.homepage" type="text" class="form-control" />
          </div>
        </div>
        <div>
          <div class="input-group mb-3">
            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon03">
              Sadama pildi lisamine
            </button>
            <input
              type="file"
              class="form-control"
              id="inputGroupFile03"
              aria-describedby="inputGroupFileAddon03"
              aria-label="Upload"
            />
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col">
              <button
                @click="openAddExtrasModal"
                type="button"
                class="btn btn-secondary text-light fw-bold shadow-sm rounded-0"
              >
                Lisa teenused
              </button>
            </div>
            <div class="col">
              <button
                @click="addNewHarbour"
                type="button"
                class="btn btn-success text-light fw-bold shadow-sm rounded-0"
              >
                Lisa sadam
              </button>
            </div>
            <div class="col">
              <button
                @click="moveToHarboursPage"
                type="button"
                class="btn btn-primary text-light fw-bold shadow-sm rounded-0"
              >
                Tagasi sadamate lehele
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import AddExtrasModal from '@/components/modal/AddExtrasModal.vue'
import AlertDanger from '@/components/AlertDanger.vue'
import AlertSuccess from '@/components/AlertSuccess.vue'
import { HARBOUR_LOCATION_ADDED, NEW_HARBOUR_ERROR } from '@/assets/script/AlertMessage'
import { HARBOUR_NAME_UNAVAILABLE } from '@/assets/script/ErrorCode'

export default {
  name: 'AddHarbourView',
  components: { AlertSuccess, AlertDanger, AddExtrasModal },
  data() {
    return {
      selectedCaptainContactId: 0,
      selectedCountyName: 'Kõik maakonnad',
      errorMessage: '',
      successMessage: '',
      captainInfo: {
        contactId: 0,
        contactFirstName: '',
        contactLastName: '',
      },
      extraInfo: {
        extraId: 0,
        extraName: '',
        isAvailable: false,
      },
      countyInfo: {
        countyId: 0,
        countyName: '',
      },
      errorResponse: {
        message: '',
        errorCode: 0,
      },
      harbourDetailedInfo: {
        locationAddress: '',
        locationLongitude: 0,
        locationLatitude: 0,
        contactId: 0,
        locationCountyName: '',
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
            isAvailable: true,
          },
        ],
        pictures: [
          {
            pictureId: 0,
            pictureData: '',
          },
        ],
      },
    }
  },
  methods: {
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
    getExtrasInfo() {
      this.$http
        .get('/harbour/extras')
        .then((response) => {
          this.extraInfo = response.data
        })
        .catch((error) => {
          router.push({ name: 'errorRoute' })
        })
    },
    getCaptainInfo() {
      this.$http
        .get('/user/captain')
        .then((response) => {
          this.captainInfo = response.data
        })
        .catch((error) => {
          router.push({ name: 'errorRoute' })
        })
    },
    openAddExtrasModal() {
      this.$refs.addExtrasModalRef.openModal()
    },

    moveToHarboursPage() {
      router.push({ name: 'harboursRoute' })
    },

    addNewHarbour() {
      this.harbourDetailedInfo.locationCountyName = this.selectedCountyName
      this.harbourDetailedInfo.contactId = this.selectedCaptainContactId
      this.harbourDetailedInfo.extras = this.$refs.addExtrasModalRef.extraInfo
      this.errorMessage = ''
      if (this.mandatoryFieldsAreFilled()) {
        this.sendAddNewHarbourRequest()
      } else {
        this.errorMessage = NEW_HARBOUR_ERROR
      }
    },

    mandatoryFieldsAreFilled() {
      let info = this.harbourDetailedInfo
      return (
        info.harbourName.length > 0 &&
        info.locationAddress.length > 0 &&
        info.minWidth > 0 &&
        info.minDepth > 0 &&
        info.spots > 0 &&
        info.phoneNumber.length > 0 &&
        info.locationCountyName !== 'Kõik maakonnad' &&
        info.contactId !== 0
      )
    },

    sendAddNewHarbourRequest() {
      this.$http
        .post('/harbour', this.harbourDetailedInfo)
        .then((response) => {
          this.successMessage = HARBOUR_LOCATION_ADDED.replace(
            '?',
            this.harbourDetailedInfo.harbourName,
          )
          setTimeout(() => {
            this.resetAllFields()
          }, 3000)
        })
        .catch((error) => {
          this.errorResponse = error.response.data
          this.handleErrorResponse()
        })
    },

    resetAllFields() {
      this.harbourDetailedInfo = []
      this.selectedCaptainContactId = 0
      this.selectedCountyName = 'Kõik maakonnad'
      this.successMessage = ''
    },

    handleErrorResponse() {
      if (this.errorResponse.errorCode === HARBOUR_NAME_UNAVAILABLE) {
        this.errorMessage = this.errorResponse.message
      } else {
        router.push({ name: 'errorRoute' })
      }
    },
  },

  mounted() {
    this.getExtrasInfo()
    this.getCountyInfo()
    this.getCaptainInfo()
  },
}
</script>
