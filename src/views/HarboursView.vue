<template>
  <div class="container text-center">
    <div class="row mb-4">
      <div class="col">
        <button @click="moveToSearchPage">Täpsem otsing</button>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <HarboursTable
            v-if="!showHarbourView"
            @event-open-harbour-details="openSelectedHarbourDetails"
            :harbours-main-info="harboursMainInfo"/>
        <HarbourDetails
            v-if="showHarbourView"
            :selected-harbour-id="selectedHarbourId"/>
      </div>
    </div>

  </div>
</template>

<script>
import router from "@/router";
import HarboursTable from "@/components/HarboursTable.vue";
import HarbourDetails from "@/components/HarbourDetails.vue";

export default {
  name: 'HarboursView',
  components: {HarbourDetails, HarboursTable},
  data() {
    return {
      harboursMainInfo: [
        {
          harbourId: 0,
          harbourName: '',
          locationLongitude: 0,
          locationLatitude: 0,
          minDepth: 0,
          minWidth: 0,
          spots: 0
        }
      ],
      selectedHarbourId: 0,
      showHarbourView: false
    }
  },

  methods: {
    getHarboursMainInfo() {
      this.$http.get("/harbours")
          .then(response => {
            this.harboursMainInfo = response.data
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
    moveToSearchPage() {
      router.push({name: 'searchRoute'})
    },
    openSelectedHarbourDetails(harbourId) {
      this.selectedHarbourId = harbourId
      this.showHarbourView = true
    },

  },

  mounted() {
    this.getHarboursMainInfo()
  }

}

</script>
