<template>
  <div>
    <Modal close-button-name="Tagasi" ref="modalRef">
      <template #header>
        <h3>{{ harbourDetailedInfo.harbourName }}</h3>
      </template>
      <template #body> Kas sa oled kindel, et soovid sadama kustutada? </template>
      <template #footer>
        <button @click="deleteHarbourPage" type="button" class="btn btn-danger rounded-0">
          Kustuta
        </button>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from '@/components/modal/Modal.vue'
import router from '@/router'
import { HARBOUR_LOCATION_DELETED } from '@/assets/script/AlertMessage'
import AlertSuccess from '@/components/alert/AlertSuccess.vue'

export default {
  name: 'DeleteHarbourModal',
  components: { Modal, AlertSuccess },
  props: {
    selectedHarbourId: Number,
  },

  data() {
    return {
      successMessage: '',
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
    openModal({ harbourId }) {
      this.$http
        .get('/harbour', {
          params: {
            harbourId: harbourId,
          },
        })
        .then((response) => {
          this.harbourDetailedInfo = response.data
          this.$refs.modalRef.openModal()
        })
        .catch((error) => {
          router.push({ name: 'errorRoute' })
        })
    },

    deleteHarbourPage() {
      this.$http
        .delete('/harbour', this.harbourDetailedInfo, {
          params: {
            harbourId: this.id,
          },
        })
        .then((response) => {
          this.displayMessage()
          this.$refs.deleteHarbourModalRef.$refs.modalRef.closeModal()
          this.handleSuccessfullyDeletedHarbour()
        })
        .catch((error) => {
          router.push({ name: 'errorRoute' })
        })
    },
    displayMessage() {
      this.successMessage = HARBOUR_LOCATION_DELETED
    },
    handleSuccessfullyDeletedHarbour() {
      router.push({ name: 'homeRoute' })
    },
  },
}
</script>
