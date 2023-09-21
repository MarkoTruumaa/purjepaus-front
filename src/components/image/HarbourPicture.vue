<template>
  <img v-if="!imageDataBase64" src="../../assets/sea-boat.jpg" class="img-thumbnail" />
  <img v-else :src="imageDataBase64" class="img-thumbnail" />
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
