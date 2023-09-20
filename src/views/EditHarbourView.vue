<template>
  <div>
    <DeleteHarbourModal ref="deleteHarbourModalRef" />
    <div class="container p-4 glass-background">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <h1>{{ harbourDetailedInfo.harbourName }} sadama info muutmine</h1>
          <div class="row justify-content-center">
            <div class="col col-4">
              <AlertDanger :alert-message="errorMessage" />
              <AlertSuccess :alert-message="successMessage" />
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col col-4">
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
              <span class="input-group-text">Maakond: </span>
              <select
                v-model="selectedCountyName"
                class="form-select"
                aria-label="Default select example"
              >
                <option
                  v-for="county in countyInfo"
                  :value="county.countyName"
                  :key="county.countyId"
                >
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
          </div>
          <div class="col col-4">
            <div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Muuda aadressi: </span>
                <input
                  v-model="harbourDetailedInfo.locationAddress"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Muuda telefoninumber: </span>
                <input v-model="harbourDetailedInfo.phoneNumber" type="text" class="form-control" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"
                  >Muuda navigatsiooniperioodi algus:
                </span>
                <input
                  v-model="harbourDetailedInfo.navigationStart"
                  type="date"
                  class="form-control"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"
                  >Muuda navigatsiooniperioodi lõpp:
                </span>
                <input
                  v-model="harbourDetailedInfo.navigationEnd"
                  type="date"
                  class="form-control"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Muuda/lisa sadama koduleht: </span>
                <input v-model="harbourDetailedInfo.homepage" type="text" class="form-control" />
              </div>
            </div>
          </div>
          <div class="col col-4">
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
        </div>
        <div class="row">
          <div class="col col-2 text-light">
            <div
              v-for="extra in harbourDetailedInfo.extras"
              :key="extra.extraId"
              class="form-check"
            >
              <input
                v-model="extra.isAvailable"
                class="form-check-input"
                type="checkbox"
                :checked="extra.isAvailable"
              />
              <label class="form-check-label">
                {{ extra.extraName }}
              </label>
            </div>
          </div>
        </div>
        <div>
          <div class="container">
            <div class="row">
              <div class="col">
                <button
                  @click="updateHarbourInfoRequest"
                  type="button"
                  class="btn btn-success rounded-0"
                >
                  Muuda sadamat
                </button>
              </div>
              <div class="col">
                <button
                  @click="this.$router.go(-1)"
                  type="button"
                  class="btn btn-primary rounded-0"
                >
                  Tagasi sadamate juurde
                </button>
              </div>
              <div class="col">
                <button
                  @click="openDeleteHarbourModal"
                  type="button"
                  class="btn btn-danger text-white shadow-sm rounded-0"
                >
                  Kustuta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import AlertSuccess from '@/components/AlertSuccess.vue'
import AlertDanger from '@/components/AlertDanger.vue'
import DeleteHarbourModal from '@/components/modal/DeleteHarbourModal.vue'
import { HARBOUR_LOCATION_UPDATED, HARBOUR_LOCATION_ERROR } from '@/assets/script/AlertMessage'
import { useRoute } from 'vue-router'

export default {
  name: 'EditHarbourView',
  components: { AlertSuccess, AlertDanger, DeleteHarbourModal },

  data() {
    return {
      harbourId: Number(useRoute().query.harbourId),
      isEdit: false,
      errorMessage: '',
      successMessage: '',
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
            isAvailable: false,
          },
        ],
        pictures: [
          {
            pictureId: 0,
            pictureData: '',
          },
        ],
      },
      countyInfo: {
        countyId: 0,
        countyName: '',
      },
      captainInfo: {
        contactId: 0,
        contactFirstName: '',
        contactLastName: '',
      },
      selectedCountyName: '',
      selectedCaptainContactId: '',
    }
  },
  methods: {
    getHarbourDetailedInfo() {
      this.$http
        .get('/harbour', {
          params: {
            harbourId: this.harbourId,
          },
        })
        .then((response) => {
          this.harbourDetailedInfo = response.data
          this.selectedCountyName = this.harbourDetailedInfo.locationCountyName
          this.selectedCaptainContactId = this.harbourDetailedInfo.contactId
        })
        .catch((error) => {
          router.push({ name: 'errorRoute' })
        })
    },
    openDeleteHarbourModal() {
      this.$refs.deleteHarbourModalRef.harbourId = this.harbourId
      this.$refs.deleteHarbourModalRef.harbourName = this.harbourDetailedInfo.harbourName
      this.$refs.deleteHarbourModalRef.$refs.modalRef.openModal()
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

    mandatoryFieldsAreFilled() {
      let info = this.harbourDetailedInfo
      return (
        info.harbourName.length > 0 &&
        info.locationAddress.length > 0 &&
        info.minWidth > 0 &&
        info.minDepth > 0 &&
        info.spots > 0 &&
        info.phoneNumber.length > 0
      )
    },

    updateHarbourInfoRequest() {
      this.resetMessages()
      if (this.mandatoryFieldsAreFilled()) {
        this.sendUpdateHarbourInfoRequest()
      } else {
        this.errorMessage = HARBOUR_LOCATION_ERROR
      }
    },

    sendUpdateHarbourInfoRequest() {
      this.$http
        .put('/harbour', this.harbourDetailedInfo, {
          params: {
            harbourId: this.harbourId,
          },
        })
        .then((response) => {
          this.successMessage = HARBOUR_LOCATION_UPDATED.replace(
            '?',
            this.harbourDetailedInfo.harbourName,
          )
        })
        .catch((error) => {
          router.push({ name: 'errorRoute' })
        })
    },

    resetMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },
  },

  beforeMount() {
    this.resetMessages()
    this.getCountyInfo()
    this.getCaptainInfo()
    this.getHarbourDetailedInfo()
  },
}
</script>
