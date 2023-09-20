<template>
  <div>
    <input type="file" @change="handlePicture" accept="image/x-png,image/jpeg,image/gif" />
  </div>
</template>

<script>
export default {
  name: 'HarbourPictureInput',
  data() {
    return {
      imageDataBase64: '',
    }
  },
  methods: {
    handlePicture(event) {
      const selectedPicture = event.target.files[0]
      this.emitBase64(selectedPicture)
    },

    emitBase64(fileObject) {
      const reader = new FileReader()
      reader.onload = () => {
        this.imageDataBase64 = reader.result
        this.$emit('event-emit-base64', this.imageDataBase64)
      }
      reader.onerror = function (error) {
        alert(error)
      }
      reader.readAsDataURL(fileObject)
    },

    setPictureDataBase64(imageDataBase64) {
      this.imageDataBase64 = imageDataBase64
    },
  },
}
</script>
