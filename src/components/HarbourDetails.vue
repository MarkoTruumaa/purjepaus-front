<template>
  <CaptainInfoModal ref="captainInfoModalRef"/>
  <BookingModal ref="bookingModalRef"/>
  <DeleteHarbourModal ref="deleteHarbourModalRef"/>
  <div>
    <div class="container shadow-sm" style="
background: rgba(255, 255, 255, 0.08);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(7.8px);
-webkit-backdrop-filter: blur(7.8px);
border: 1px solid rgba(255, 255, 255, 0.3);">
      <div class="container-fluid">
        <div class="row justify-content-center" style="background-color: transparent">

          <div class="col-9 mb-3"><h1>{{ harbourDetailedInfo.harbourName }} </h1></div>
          <div class="col-4  mb-1">

            <img src="./sea-boat.jpg" class="img-fluid mb-4" alt="sadama pilt"
                 :style="{ width: 300 + 'px', height: 300 + 'px' }"> <br>
            <div>

              <button @click="openCaptainInfoModal" type="button"
                      class="text-light  btn btn-outline-light shadow-sm rounded-0 mb-3">Sadamakapteni info
              </button>
            </div>

          </div>
          <div class="col-6">
            <div>
              <font-awesome-icon :icon="['fas', 'location-dot']"/>
              Aadress: {{ harbourDetailedInfo.locationAddress }}
            </div>
            <div>
              <font-awesome-icon :icon="['fas', 'map-location-dot']"/>
              Koordinaadid: {{ harbourDetailedInfo.locationLongitude }}, {{ harbourDetailedInfo.locationLatitude }}
            </div>
            <div>
              <font-awesome-icon :icon="['fas', 'arrow-down']"/>
              Sissesõidu väikseim sügavus: {{ harbourDetailedInfo.minDepth }} meetrit
            </div>
            <div>
              <font-awesome-icon :icon="['fas', 'arrows-left-right']"/>
              Sissesõidu väikseim laius: {{ harbourDetailedInfo.minWidth }} meetrit
            </div>
            <div>
              <font-awesome-icon :icon="['fas', 'anchor']"/>
              Kohtade arv sadamas: {{ harbourDetailedInfo.spots }}
            </div>
            <div>Navigatsiooniperioodi algus: {{ harbourDetailedInfo.navigationStart }}
            </div>
            <div>Navigatsiooniperioodi lõpp: {{ harbourDetailedInfo.navigationEnd }}</div>
            <div>
              <font-awesome-icon :icon="['fas', 'phone']"/>
              Kontakttelefon: {{ harbourDetailedInfo.phoneNumber }}
            </div>
            <div>
              <font-awesome-icon :icon="['fas', 'house']"/>
              <a :href="'https://' + harbourDetailedInfo.homepage"> {{ harbourDetailedInfo.homepage }}</a>
            </div>
            <div>
              <h3>Lisavõimalused:</h3>
              <ul class="list-group mb-3">
                <li class="list-group-item" style="background: rgba(255, 255, 255, 0);
border-radius: 0px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(0px);
-webkit-backdrop-filter: blur(0px);">
                  <td v-for="extra in harbourDetailedInfo.extras" :key="extra.extraId">
                    <font-awesome-icon :icon="['fas', 'check']"/>
                    {{ extra.extraName }}
                  </td>
                </li>
              </ul>
            </div>
            <div>
              <button @click="openBookingModal" type="button"
                      class="text-light btn btn-outline-light shadow-sm rounded-0 mb-3">Vabad
                kohad
              </button>
              <br>
              <button @click="goBack" type="button"
                      class="text-light  btn btn-outline-light shadow-sm rounded-0 mb-3">Tagasi sadamate
                juurde
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button @click="moveToEditHarbourPage" type="button"
                class="btn btn-dark btn-outline-light text-white shadow-sm rounded-0  m-2">Muuda
        </button>
        <button @click="openDeleteHarbourModal" type="button"
                class="btn btn-danger btn-outline-light text-white shadow-sm rounded-0 m-2">Kustuta
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import router from "@/router";
import CaptainInfoModal from "@/components/modal/CaptainInfoModal.vue";
import BookingModal from "@/components/modal/BookingModal.vue";
import DeleteHarbourModal from "@/components/modal/DeleteHarbourModal.vue";
import {DELETE_MODAL} from "@/assets/script/ModalType";


export default {
  name: 'HarbourDetails',
  components: {DeleteHarbourModal, BookingModal, CaptainInfoModal},
  emits: ['goBack'],
  props: {
    selectedHarbourId: Number,
  },
  data() {
    return {
      harbourDetailedInfo: {
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
              harbourId: this.selectedHarbourId
            }
          }
      ).then(response => {
        this.harbourDetailedInfo = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },
    openCaptainInfoModal() {
      this.$refs.captainInfoModalRef.openModal({
        contactId: this.harbourDetailedInfo.contactId
      });
    },
    openDeleteHarbourModal() {
      this.$refs.deleteHarbourModalRef.openModal({
        harbourId: this.harbourDetailedInfo.harbourId, DELETE_MODAL
      });
    },
    goBack() {
      this.$emit('goBack')
    },
    moveToEditHarbourPage() {
      router.push({name: 'editHarbourRoute', params: {id: this.selectedHarbourId}})
    },
    openBookingModal() {
      this.$refs.bookingModalRef.openModal()
    },
  },
  mounted() {
    this.getHarbourDetailedInfo()
  }
}


</script>