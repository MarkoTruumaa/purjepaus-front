<template>
  <div class="container d-flex flex-column">
    <div>
      <img alt="Vue logo" src="../assets/logo.png" style="height: 100px">
      <div class="input-group mb-3 shadow-sm">
        <input v-model="harbourSearchValue" type="text" class="form-control dropdown-toggle border-0"
               placeholder="Otsi sadamat ja mine reisule"
               aria-label="Text input with dropdown button" data-bs-toggle="dropdown"
               aria-expanded="false">
        <ul class="dropdown-menu" style="z-index: 10000">
          <li v-for="harbour in filterHarbours()" class="dropdown-item" :key="harbour.harbourId"
              @click="selectHarbour(harbour)">
            {{ harbour.harbourName }}
          </li>
        </ul>
        <span class="input-group-text border-0 bg-white"><font-awesome-icon :icon="['fas', 'search']"/></span>
      </div>
    </div>
    <div class="flex-fill position-relative">
      <l-map ref="map" :zoom="7" :center="[58.889389, 25.541139]">
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker :visible="!!selectedHarbour" :lat-lng="selectedLatLng"></l-marker>
      </l-map>
      <div v-if="!!selectedHarbour"
           class="position-absolute bottom-0 w-25 bottom-50"
           style="z-index: 10000;right: 1rem">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ selectedHarbour.harbourName }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">{{ selectedHarbour.locationLatitude }},
              {{ selectedHarbour.locationLongitude }}</h6>
            <router-link :to="'/harbours/' + selectedHarbour.harbourId">Lisainfo sadama kohta</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import {LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet";
import router from "@/router";
import {latLng} from "leaflet";

export default {
  name: 'HomeView',
  components: {LMarker, LMap, LTileLayer},
  data() {
    return {
      harbourSearchValue: '',
      selectedHarbour: null,
      harboursMainInfo: [{
        harbourId: 0,
        harbourName: '',
        locationLongitude: 0,
        locationLatitude: 0,
        minDepth: 0,
        minWidth: 0,
        spots: 0
      }],
    };
  },
  computed: {
    selectedLatLng() {
      return this.selectedHarbour ? latLng(this.selectedHarbour.locationLongitude, this.selectedHarbour.locationLatitude) : latLng(0, 0);
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
    filterHarbours() {
      return this.harboursMainInfo.filter((harbour) => harbour.harbourName.toLowerCase().includes(this.harbourSearchValue.toLowerCase()))
    },
    selectHarbour(harbour) {
      this.harbourSearchValue = harbour.harbourName
      this.selectedHarbour = harbour
      const latLang = latLng(harbour.locationLongitude, harbour.locationLatitude)
      this.$refs.map.leafletObject.setView(latLang, 14, {animate: true})
    },
  },
  beforeMount() {
    this.getHarboursMainInfo()
  },
}
</script>
