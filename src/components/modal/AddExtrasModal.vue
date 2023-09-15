<template>
  <div>
    <Modal close-button-name="Tagasi" ref="modalRef">
      <template #header>
        <h4>Lisavõimaluste lisamine</h4>
      </template>
      <template #body>
        <div v-for="extra in extraInfo" class="col form-check">
          <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            {{ extra.extraName }}
          </label>
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
  name: 'AddExtrasModal',
  components: {Modal},
  data(){
    return {
    extraInfo: {
      extraId: 0,
          extraName: '',
          isAvailable: true
    }
    }
  },
  methods: {
    openModal ({extraId}) {
      this.$http.get("/harbour/extras",{
        params: {
          extraId: extraId
        }
      }
      ).then(response => {
        this.extraInfo = response.data;
        this.$refs.modalRef.openModal()
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },
  },


};
</script>