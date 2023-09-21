<template>
  <div class="container p-2 glass-background">
    <div class="margin mt-4">
      <h1>Meist</h1>
    </div>
    <div class="align-content-center">
      <div class="card">
        <div class="card-body">
          <p class="card-text">
            Sina ju tead nagu meiegi, et merele minnes on kõige olulisem plaan. Millal minna,
            kuidas ja kuhu välja jõuda.
          </p>
          <p>
            Teame ka seda, et meri nagu plaanidki võib kiiresti muutuda ning siis tuleb merelolijail
            kohaneda.
          </p>
          <p>
            Purjepaus aitab sul teha merele minnes plaani, kuhu sadamasse sa jõuda tahad. Ning kui
            plaan muutub, saad meie abil uue sadama valida.
          </p>
          <p>
            Lisaks tavapärasele sadamainfole pakume me võimalust leida sadam, mis sinu vajadustele
            vastab - olgu sul kaasas väikesed lapsed või oled ise juba kogenud purjetaja, kelle
            jaoks on oluline sadama ja selle teenuste ligipääsetavus.
          </p>
          <p>
            Kui sul on küsimusi või ettepanekuid, kuidas saaksime veel paremini, võta meiega
            kindlasti ühendust!
          </p>
          <p>Sinu Purjepaus</p>
        </div>
      </div>
      <div>
        <div class="margin-top: 20px">
          <button @click="moveToHomeView" type="button"
                  class="btn btn-outline-light shadow-sm rounded-0 mb-3 m-2">
            Tagasi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'AboutView',
  methods: {
    moveToHomeView() {
      router.push({name: 'homeRoute'})
    }

  }
}
</script>

<style scoped>
.card {
  top: 3px;
  left: 37%;
  width: 350px;
}

header {
  top: 25px;
  left: 20%;
  width: 30px;
}
</style>
