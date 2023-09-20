<template>
  <div>
    <Modal close-button-name="Tagasi" ref="modalRef">
      <template #header>
        <h3>{{ harbourName }} sadam</h3>
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
import AlertSuccess from '@/components/AlertSuccess.vue'

export default {
  name: 'DeleteHarbourModal',
  components: { Modal, AlertSuccess },

  data() {
    return {
      harbourId: 0,
      harbourName: '',
      successMessage: '',
    }
  },

  methods: {
    deleteHarbourPage() {
      this.$http
        .delete('/harbour', {
          params: {
            harbourId: this.harbourId,
          },
        })
        .then((response) => {
          this.displayMessage()
          this.$refs.modalRef.closeModal()
          this.handleSuccessfullyDeletedHarbour()
        })
        .catch((error) => {
          router.push({ name: 'errorRoute' })
        })
    },

    displayMessage() {
      this.successMessage = HARBOUR_LOCATION_DELETED.replace('?', this.harbourName)
    },
    handleSuccessfullyDeletedHarbour() {
      router.push({ name: 'harboursRoute' })
    },
  },
}
</script>
