<template>
  <CaptainInfoModal ref="captainInfoModalRef"/>
  <div>

    <div class="row justify-content-center">
      <div class="col-9 mb-3"><h1>{{ harbourDetailedInfo.harbourName }} </h1></div>
      <div class="col-4  mb-1">
        <img src="./harbourSample.jpeg" class="img-fluid mb-4" alt="sadama pilt"
             :style="{ width: 300 + 'px', height: 300 + 'px' }"> <br>
        <div>

          <button @click="openCaptainInfoModal" type="button" class="btn btn-secondary mb-3">Sadamakapteni info
          </button>
        </div>

      </div>
      <div class="col-6">
        <table class="table table-borderless align-bottom">
          <tbody>
          <tr>
            <td>Aadress: {{ harbourDetailedInfo.locationAddress }}</td>
          </tr>
          <tr>
            <td>Koordinaadid: {{ harbourDetailedInfo.locationLongitude }}, {{ harbourDetailedInfo.locationLatitude }}
            </td>
          </tr>
          <tr>
            <td>Sissesõidu väikseim sügavus: {{ harbourDetailedInfo.minDepth }} meetrit</td>
          </tr>
          <tr>
            <td>Sissesõidu väikseim laius: {{ harbourDetailedInfo.minWidth }} meetrit</td>
          </tr>
          <tr>
            <td>Kohtade arv sadamas: {{ harbourDetailedInfo.spots }}</td>
          </tr>
          <tr>
            <td>Navigatsiooniperioodi algus: {{ harbourDetailedInfo.navigationStart }}
            </td>
          </tr>
          <tr>
            <td>Navigatsiooniperioodi lõpp: {{ harbourDetailedInfo.navigationEnd }}</td>
          </tr>
          <tr>
            <td>Kontakttelefon: {{ harbourDetailedInfo.phoneNumber }}</td>
          </tr>
          <tr>
            <td>Koduleht: {{ harbourDetailedInfo.homepage }}</td>
          </tr>
          <tr>
            <td>Lisavõimalused: {{ harbourDetailedInfo.extras }}</td>
          </tr>

          </tbody>
        </table>
        <div>
          <button type="button" class="btn btn-secondary float-right mb-3">Vabad kohad</button>
          <br>
          <button @click="this.goBack" type="button" class="btn btn-primary float-right mb-3">Tagasi sadamate juurde</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <button type="button" class="btn btn-dark m-2">Muuda</button>
    <button type="button" class="btn btn-danger m-2">Kustuta</button>
  </div>

</template>


<script>
import router from "@/router";
import CaptainInfoModal from "@/components/modal/CaptainInfoModal.vue";


export default {
  name: 'HarbourDetails',
  components: {CaptainInfoModal},
  props: {
    selectedHarbourId: Number,
  },

  data() {
    return {
      harbourDetailedInfo: [
        {
          harbourId: 0,
          locationAddress: '',
          locationLongitude: 0,
          locationLatitude: 0,
          contactId: 0,
          harbourName: '',
          homepage: '',
          navigationStart: '',
          navigationEnd: '',
          minDepth: 0,
          minWidth: 0,
          spots: 0,
          phoneNumber: '',
          extras: [
            {
              extraId: 0,
              extraName: '',
              isAvailable: true
            }
          ],
          pictures: [
            {
              pictureId: 0,
              pictureData: ''
            }
          ]
        },
      ]


    }
  },
  methods: {
    getHarbourDetailedInfo() {
      this.$http.get('/harbour', {
            params: {
              harbourId: this.selectedHarbourId
            }
          }
      ).then(response => {
        this.harbourDetailedInfo = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },
    openCaptainInfoModal() {
      this.$refs.captainInfoModalRef.openModal({
        contactId: this.harbourDetailedInfo.contactId
      });
    },
    goBack() {
      this.$emit('goBack')
    }
  },
  mounted() {
    this.getHarbourDetailedInfo()
  }
}


</script>