<template>
  <div>
    <Modal close-button-name="Sulge" ref="modalRef">
      <template #header>
        <h4></h4>
      </template>
      <template #body>
        <h5></h5> <br>
        <h5> <br></h5>
      </template>
      <template #footer>

      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'AddExtrasModal',
  components: {Modal},
  methods: {
    openModal () {
      this.$refs.modalRef.openModal()
    }
  }
};
</script>