<template>
  <CaptainInfoModal ref="captainInfoModalRef"/>
  <div class="container p-4 glass-background">
    <div class="row justify-content-center" style="background-color: transparent">
      <h1>{{ harbourDetailedInfo.harbourName }}</h1>
      <div class="col-4 mb-1">
        <HarbourPicture :picture-data-base64="getImageData"/>
        <br/>
        <div>
          <button
              @click="openCaptainInfoModal"
              type="button"
              class="text-light btn btn-outline-light shadow-sm rounded-0 mb-3"
          >
            Sadamakapteni info
          </button>
        </div>
      </div>
      <div class="col-6">
        <ul class="list-group mb-3 glass-background" style="background-color: transparent">
          <li class="list-group-item bg-transparent border-0 rounded-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <font-awesome-icon :icon="['fas', 'location-dot']"/>
                Aadress
              </div>
              {{ harbourDetailedInfo.locationAddress }}
            </div>
          </li>
          <li class="list-group-item bg-transparent border-0 rounded-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <font-awesome-icon :icon="['fas', 'map-location-dot']"/>
                Koordinaadid
              </div>
              {{ harbourDetailedInfo.locationLongitude }},
              {{ harbourDetailedInfo.locationLatitude }}
            </div>
          </li>
          <li class="list-group-item bg-transparent border-0 rounded-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <font-awesome-icon :icon="['fas', 'arrow-down']"/>
                Sissesõidu väikseim sügavus
              </div>
              {{ harbourDetailedInfo.minDepth }} meetrit
            </div>
          </li>
          <li class="list-group-item bg-transparent border-0 rounded-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <font-awesome-icon :icon="['fas', 'arrows-left-right']"/>
                Sissesõidu väikseim laius
              </div>
              {{ harbourDetailedInfo.minWidth }} meetrit
            </div>
          </li>
          <li class="list-group-item bg-transparent border-0 rounded-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <font-awesome-icon :icon="['fas', 'anchor']"/>
                Kohtade arv sadamas
              </div>
              {{ harbourDetailedInfo.spots }}
            </div>
          </li>
          <li class="list-group-item bg-transparent border-0 rounded-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                Navigatsiooniperioodi algus:
                {{ harbourDetailedInfo.navigationStart }}
              </div>
            </div>
          </li>
          <li class="list-group-item bg-transparent border-0 rounded-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                Navigatsiooniperioodi lõpp:
                {{ harbourDetailedInfo.navigationEnd }}
              </div>
            </div>
          </li>
          <li class="list-group-item bg-transparent border-0 rounded-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <font-awesome-icon :icon="['fas', 'phone']"/>
                Kontakttelefon
              </div>
              {{ harbourDetailedInfo.phoneNumber }}
            </div>
          </li>
          <li class="list-group-item bg-transparent border-0 rounded-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <font-awesome-icon :icon="['fas', 'house']"/>
                <a :href="'https://' + harbourDetailedInfo.homepage" class="text-light">
                  {{ harbourDetailedInfo.homepage }}</a
                >
              </div>
            </div>
          </li>
          <li class="list-group-item bg-transparent border-0 rounded-0">
            <div class="ms-2 me-auto">
              <div class="fw-bold">Lisavõimalused</div>
              <div v-for="extra in harbourDetailedInfo.extras" :key="extra.extraId">
                <p v-if="extra.isAvailable">
                  <font-awesome-icon :icon="['fas', 'check']"/>
                  {{ extra.extraName }}
                </p>
              </div>
            </div>
          </li>
        </ul>

        <div>
          <button
              @click="moveToHarboursPage"
              type="button"
              class="text-light btn btn-outline-light shadow-sm rounded-0 mb-3 m-2"
          >
            Tagasi sadamate juurde
          </button>
          <button
              v-if="isAdmin"
              @click="moveToEditHarbourPage"
              type="button"
              class="btn btn-dark btn-outline-light text-white shadow-sm rounded-0 mb-3 m-2"
          >
            Muuda
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import CaptainInfoModal from '@/components/modal/CaptainInfoModal.vue'
import HarbourPicture from '@/components/image/HarbourPicture.vue'
import {useRoute} from 'vue-router'

export default {
  name: 'HarbourView',
  components: {HarbourPicture, CaptainInfoModal},

  computed: {
    getImageData() {
      return this.harbourDetailedInfo.pictures?.[0]?.pictureData || null
    },
  },
  data() {
    return {
      isAdmin: false,
      harbourId: Number(useRoute().query.harbourId),
      harbourDetailedInfo: {
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
    getHarbourDetailedInfo() {
      this.$http
          .get('/harbour', {
            params: {
              harbourId: this.harbourId,
            },
          })
          .then((response) => {
            this.harbourDetailedInfo = response.data
          })
          .catch((error) => {
            this.errorResponse = error.response.data
          })
    },
    openCaptainInfoModal() {
      this.$refs.captainInfoModalRef.openModal({
        contactId: this.harbourDetailedInfo.contactId,
      })
    },
    moveToHarboursPage() {
      router.push({name: 'harboursRoute'})
    },
    moveToEditHarbourPage() {
      router.push({name: 'editHarbourRoute', query: {harbourId: this.harbourId}})
    },

    checkUserRole() {
      if (sessionStorage.getItem('roleName') === 'admin') {
        this.isAdmin = true
      }
    },
  },
  beforeMount() {
    this.getHarbourDetailedInfo()
    this.checkUserRole()
  },
}
</script>
