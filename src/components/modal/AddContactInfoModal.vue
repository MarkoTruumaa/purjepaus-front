<template>
  <div>
    <Modal close-button-name="Tagasi" ref="modalRef">
      <template #header>
        <h4>Kontaktinfo lisamine</h4>
      </template>
      <template #body>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Lisa aadress: </span>
          <input type="text" class="form-control">
        </div><div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Lisa telefoninumber: </span>
          <input type="text" class="form-control">
        </div><div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Navigatsiooniperioodi algus: </span>
          <input type="text" class="form-control">
        </div><div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Navigatsiooniperioodi lõpp: </span>
          <input type="text" class="form-control">
        </div><div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Lisa sadama koduleht: </span>
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
  name: 'AddContactInfoModal',
  components: {Modal},
  methods: {
    openModal () {
      this.$refs.modalRef.openModal()
    }
  }
};
</script>