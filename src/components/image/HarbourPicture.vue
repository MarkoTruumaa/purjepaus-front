<template>
  <img v-if="pictureDataBase64 === ''" src="../sea-boat.jpg" class="img-thumbnail img-fluid mb-4"/>
  <img v-else :src="pictureDataBase64" class="img-thumbnail">
</template>
<script>
export default {
  name: 'HarbourPicture',
  props: {
    pictureDataBase64: String
  }
}
</script>