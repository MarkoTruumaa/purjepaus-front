<template>
  <div>
    <Modal close-button-name="Tagasi" ref="modalRef">
      <template #header>
        <h4>Kontaktinfo lisamine</h4>
      </template>
      <template #body>
        <h5>Lisa aadress: </h5> <br>
        <h5>Lisa telefoninumber:</h5><br>
        <h5>Navigatsiooniperioodi algus:</h5><br>
        <h5>Navigatsiooniperioodi lõpp:</h5><br>
        <h5>Lisa sadama koduleht:</h5><br>
      </template>
      <template #footer>

      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'AddContactInfoModal',
  components: {Modal},
  methods: {
    openModal () {
      this.$refs.modalRef.openModal()
    }
  }
};
</script>