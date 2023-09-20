<template>
  <div class="container p-4 glass-background">
    <div class="container text-center">
      <h1>Kõik sadamad</h1>
      <table class="table table-hover">
        <thead class="table-dark">
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
              <a href="javascript:void(0)" @click="openHarbourDetails(harbour.harbourId)">{{
                harbour.harbourName
              }}</a>
            </th>
            <td>{{ harbour.locationLongitude + ', ' + harbour.locationLatitude }}</td>
            <td>{{ harbour.minDepth }}</td>
            <td>{{ harbour.minWidth }}</td>
            <td>{{ harbour.spots }}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button @click="moveToAddHarbourPage" type="button" class="btn btn-primary rounded-0 mb-3">
          Lisa uus sadam
        </button>
        <br />
      </div>
      <div>
        <button
          @click="moveToSearchHarbourPage"
          type="button"
          class="btn btn-secondary rounded-0 mb-3"
        >
          Sadamate otsingu lehele
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router'

export default {
  name: 'HarboursTable',
  emits: ['openHarbourDetails'],
  props: {
    harboursMainInfo: {},
  },

  methods: {
    openHarbourDetails(harbourId) {
      this.$emit('openHarbourDetails', harbourId)
    },
    moveToAddHarbourPage() {
      router.push({ name: 'addHarbourRoute' })
    },
    moveToSearchHarbourPage() {
      router.push({ name: 'searchRoute' })
    },
  },
}
</script>
