<template>
  <img v-if="!imageDataBase64" src="../../assets/sea-boat.jpg" class="img-fluid mb-4" />
  <img v-else :src="imageDataBase64" class="img-fluid mb-4" />
</template>
<script>
export default {
  name: 'HarbourPicture',
  props: {
    imageDataBase64: String,
  },
}
</script>
<style></style>
