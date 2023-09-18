<template>
  <div>
    <Modal close-button-name="Tagasi" ref="modalRef">
      <template #header>
        <h4>Kontaktinfo muutmine</h4>
      </template>
      <template #body>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Muuda aadressi: </span>
          <input type="text" class="form-control">
        </div><div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Muuda telefoninumber: </span>
        <input type="text" class="form-control">
      </div><div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Muuda navigatsiooniperioodi algus: </span>
        <input type="text" class="form-control">
      </div><div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Muuda navigatsiooniperioodi lõpp: </span>
        <input type="text" class="form-control">
      </div><div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Muuda/lisa sadama koduleht: </span>
        <input type="text" class="form-control">
      </div>
      </template>
      <template #footer>

      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'EditContactInfoModal',
  components: {Modal},
  methods: {
    openModal () {
      this.$refs.modalRef.openModal()
    },

  }
};
</script>