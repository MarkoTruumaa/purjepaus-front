<template>
  <div>
    <Modal close-button-name="Tagasi" ref="modalRef">

      <template #header>
        <h3>{{ harbourDetailedInfo.harbourName }}</h3>
      </template>
      <template #body>
        Kas sa oled kindel, et soovid sadama kustutada?
      </template>
      <template #footer>
        <button @click="deleteHarbourPage" type="button" class="btn btn-danger">Kustuta</button>
      </template>
    </Modal>

  </div>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import {HARBOUR_LOCATION_DELETED} from "@/assets/script/AlertMessage";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'DeleteHarbourModal',

  components: {Modal, AlertSuccess},
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

    openModal({harbourId}) {
      this.$http.get("/harbour", {
            params: {
              harbourId: harbourId
            }
          }
      ).then(response => {
        this.harbourDetailedInfo = response.data;
        this.$refs.modalRef.openModal()
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },

    deleteHarbourPage() {
      this.$http.delete("/harbour", {
            params: {
              harbourId: this.harbourDetailedInfo.harbourId
            }
          }
      ).then(response => {
        console.log("tsau")
        this.displayMessage()
        this.$refs.deleteHarbourModalRef.$refs.modalRef.closeModal()
        this.handleSuccessfullyDeletedHarbour()
      }).catch(error => {

        router.push({name: 'errorRoute'})
      })
    },
    displayMessage() {
      console.log("tsau")
      this.message = HARBOUR_LOCATION_DELETED;
    },
    handleSuccessfullyDeletedHarbour(){
      console.log("tsau")
      router.push({name: 'homeRoute'})
    }

  }
}
</script>