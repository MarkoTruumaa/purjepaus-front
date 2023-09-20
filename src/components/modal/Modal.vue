<template>
  <div
    v-if="isOpen"
    class="modal modal-dialog-centered rounded-0 fade show d-block"
    tabindex="-1"
    @click="closeModal"
  >
    <div class="modal-dialog modal-lg rounded-0" @click.stop>
      <div class="modal-content">
        <div class="modal-header border-0 rounded-0">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <slot name="header"> Default title </slot>
          </h1>
          <button
            type="button"
            class="btn-close btn-outline-light text-white shadow-sm rounded-0"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body"> default body </slot>
        </div>
        <div class="modal-footer border-0 rounded-0">
          <button
            type="button"
            class="btn btn-secondary text-white shadow-sm rounded-0"
            @click="closeModal"
          >
            {{ closeButtonName }}
          </button>
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    closeButtonName: String,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    },
  },
}
</script>
