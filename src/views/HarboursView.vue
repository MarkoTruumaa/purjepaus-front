<template>
  <div class="container text-center">
    <div class="row mb-4">
      <div class="col">
        <button @click="moveToSearchPage">Täpsem otsing</button>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <HarboursTable :harbours-main-info="harboursMainInfo"/>


      </div>
    </div>

  </div>
</template>

<script>
import router from "@/router";
import HarboursTable from "@/components/HarboursTable.vue";

export default {
  name: 'HarboursView',
  components: {HarboursTable},
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
      ]
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

  },

  mounted() {
    this.getHarboursMainInfo()
  }

}

</script>
