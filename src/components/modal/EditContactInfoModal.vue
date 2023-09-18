<template>
  <div>
    <Modal close-button-name="Tagasi" ref="modalRef">
      <template #header>
        <h4>Kontaktinfo muutmine</h4>
      </template>
      <template #body>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Muuda aadressi: </span>
          <input v-model="harbourDetailedInfo.locationAddress" type="text" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Muuda telefoninumber: </span>
          <input v-model="harbourDetailedInfo.phoneNumber" type="text" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Muuda navigatsiooniperioodi algus: </span>
          <input v-model="harbourDetailedInfo.navigationStart" type="date" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Muuda navigatsiooniperioodi lõpp: </span>
          <input v-model="harbourDetailedInfo.navigationEnd" type="date" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Muuda/lisa sadama koduleht: </span>
          <input v-model="harbourDetailedInfo.homepage" type="text" class="form-control">
        </div>
      </template>
      <template #footer>
        <div class="col">
          <button type="button" class="btn btn-success">Salvesta kontakt</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'EditContactInfoModal',
  components: {Modal},
  props: ['id'],

  data() {
    return {
      harbourDetailedInfo: {
        harbourId: 0,
        locationAddress: '',
        locationLongitude: 0,
        locationLatitude: 0,
        contactId: 0,
        countyName: '',
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
    };

  },

  methods: {
    createEditBody() {
      return {
        locationCountyId: this.selectedCountyId,
        locationAddress: this.harbourDetailedInfo.locationAddress,
        locationLongitude: this.harbourDetailedInfo.locationLongitude,
        locationLatitude: this.harbourDetailedInfo.locationLatitude,
        contactId: this.harbourDetailedInfo.contactId,
        harbourName: this.harbourDetailedInfo.harbourName,
        homepage: this.harbourDetailedInfo.homepage,
        navigationStart: this.harbourDetailedInfo.navigationStart,
        navigationEnd: this.harbourDetailedInfo.navigationEnd,
        minDepth: this.harbourDetailedInfo.minDepth,
        minWidth: this.harbourDetailedInfo.minWidth,
        spots: this.harbourDetailedInfo.spots,
        phoneNumber: this.harbourDetailedInfo.phoneNumber,
        extras: this.harbourDetailedInfo.extras,
        pictures: this.harbourDetailedInfo.pictures
      };
    },

    openModal ({harbourId}) {
      this.$http.put("/harbour", this.createEditBody(),{
        params: {
        harbourId: harbourId
        }
          }
          ).then(response => {
            this.harbourDetailedInfo = response.data;
            this.$refs.modalRef.openModal()
      }). catch(error => {
        this.errorResponse = error.response.data
      })

    },

  }
};
</script>