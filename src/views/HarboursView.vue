<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <HarboursTable
          v-if="!showHarbourView"
          @open-harbour-details="openSelectedHarbourDetails"
          :harbours-main-info="harboursMainInfo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import HarboursTable from '@/components/HarboursTable.vue'

export default {
  name: 'HarboursView',
  components: { HarboursTable },
  props: ['id'],
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
          spots: 0,
        },
      ],
      selectedHarbourId: 0,
      showHarbourView: false,
    }
  },
  methods: {
    getHarboursMainInfo() {
      this.$http
        .get('/harbours')
        .then((response) => {
          this.harboursMainInfo = response.data
        })
        .catch((error) => {
          router.push({ name: 'errorRoute' })
        })
    },
    openSelectedHarbourDetails(harbourId) {
      this.selectedHarbourId = harbourId
      this.showHarbourView = true
    },
  },
  beforeMount() {
    if (this.id) {
      this.openSelectedHarbourDetails(Number(this.id))
    }
  },
  mounted() {
    this.getHarboursMainInfo()
  },
}
</script>
