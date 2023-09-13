<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Eesnimi: {{ contactInfo.contactFirstName }}</li>
    <li class="list-group-item">Perekonnanimi: {{ contactInfo.contactLastName }}</li>
    <li class="list-group-item">E-mail: {{ contactInfo.contactEmail }}</li>
    <li class="list-group-item">Telefon: {{ contactInfo.contactTelephone }}</li>
    <li class="list-group-item">Aadress: {{ contactInfo.contactAddress }}</li>
  </ul>

</template>
<script>
export default {
  name: 'ProfileInfo',
  props: {
    contactInfo: {}
  }
}
</script>