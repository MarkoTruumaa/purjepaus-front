<template>
  <table class="table table-primary table-hover table-striped">
    <thead>
    <tr>
      <th scope="col">Nimi</th>
      <th scope="col">Koordinaadid</th>
      <th scope="col">Miinimum sügavus</th>
      <th scope="col">Miinimum laius</th>
      <th scope="col">Kohtade arv</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="harbour in harboursMainInfo" :key="harbour.harbourId">
      <th scope="row">
        <a href="javascript:void(0)" @click="openHarbourDetails(harbour.harbourId)" >{{ harbour.harbourName }}</a>
      </th>
      <td>{{ harbour.locationLongitude + ', ' + harbour.locationLatitude}}</td>
      <td>{{harbour.minDepth}}</td>
      <td>{{ harbour.minWidth }}</td>
      <td>{{ harbour.spots }}</td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'HarboursTable',
  props: {
    harboursMainInfo: {}
  },

  methods: {
    openHarbourDetails(harbourId) {
      this.$emit('event-open-harbour-details', harbourId)
    },
  }
}
</script>