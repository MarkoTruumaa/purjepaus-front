<template>
  <div class="container p-4 glass-background">
    <div class="container text-center">
      <h1>Sadamad</h1>
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
              <a href="javascript:void(0)" @click="navigateToHarbourView(harbour.harbourId)">{{
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
        <button v-if="isAdmin" @click="moveToAddHarbourPage" type="button" class="btn btn-primary rounded-0 mb-3">
          Lisa uus sadam
        </button>
        <br />
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
  data() {
    return {
      isAdmin: false
    }
  },

  methods: {
    navigateToHarbourView(harbourId) {
      router.push({ name: 'harbourRoute', query: { harbourId: harbourId } })
    },
    moveToAddHarbourPage() {
      router.push({ name: 'addHarbourRoute' })
    },

    checkUserRole() {
      if (sessionStorage.getItem('roleName') === 'admin') {
        this.isAdmin = true
      }
    }
  },
  mounted() {
    this.checkUserRole()
  }
}
</script>
