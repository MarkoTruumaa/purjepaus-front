<template>
  <div>
    <Modal close-button-name="Sulge" ref="modalRef">
      <template #header>
        <h5>Selle sadama kapten:</h5>
      </template>
      <template #body>
        <div>
          <h4>{{ captainInfo.firstName }} {{ captainInfo.lastName }}</h4>
          <h5>e-mail: {{ captainInfo.email }} <br /></h5>
          <h5>telefon: {{ captainInfo.telephone }} <br /></h5>
        </div>
      </template>
      <template #footer> </template>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/modal/Modal.vue'

export default {
  name: 'CaptainInfoModal',
  components: { Modal },
  data() {
    return {
      captainInfo: {
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        address: '',
      },
    }
  },
  methods: {
    openModal({ contactId }) {
      this.$http
        .get('/harbour/captain-info', {
          params: {
            contactId: contactId,
          },
        })
        .then((response) => {
          this.captainInfo = response.data
          this.$refs.modalRef.openModal()
        })
        .catch((error) => {
          this.errorResponse = error.response.data
        })
    },
  },
}
</script>
