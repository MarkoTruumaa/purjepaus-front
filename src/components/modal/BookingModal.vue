<template>
  <div>
    <Modal close-button-name="Sulge" ref="modalRef">
      <template #header>
        <h4>Broneeri sobiv aeg</h4>
      </template>
      <template #body>
        <VueDatePicker v-model="date"></VueDatePicker>
      </template>

      <template #footer>
        <button type="button" class="btn btn-warning">Broneeri</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'BookingModal',
  components: {Modal, VueDatePicker},
  methods: {
    openModal() {
      this.$refs.modalRef.openModal()
    }
  },
  data() {
    return {
      date: null,
    }
  }
}

</script>