<template>
  <div class="container glass-background">
    <div class="mt-4">
      <h1>Meist</h1>
    </div>
    <div class="row px-4 pb-4">
      <div class="card col me-2">
        <div class="card-body">
          <p class="card-text">
            Sina ju tead nagu meiegi, et merele minnes on kõige olulisem plaan. Millal minna, kuidas
            ja kuhu välja jõuda.
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
      <div class="col ms-2 d-flex flex-column">
        <div class="row glass-background mb-3">
          <div class="margin mt-4">
            <h3>Jäta meile tagasisidet</h3>
          </div>
          <form action="https://formspree.io/f/xzbljjde" method="POST">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label mb-3">Saada meile kiri</label>
              <input
                placeholder="sinu e-maili aadress"
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" class="form-text">
                Sisesta siia oma meiliaadress ja kiri ja pane sõnum teele :)
              </div>
            </div>
            <div class="mb-3 input-group">
              <textarea
                name="message"
                class="form-control"
                placeholder="Sinu kiri meile"
                aria-label="With textarea"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-outline-light rounded-0 mb-3">Saada kiri</button>
          </form>
        </div>
        <div class="d-flex flex-fill align-items-center justify-content-center">
          <button
            @click="moveToHomeView"
            type="button"
            class="btn btn-lg btn-outline-light shadow-sm rounded-0 mb-3"
          >
            Tagasi avalehele
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'AboutView',
  methods: {
    moveToHomeView() {
      router.push({ name: 'homeRoute' })
    },
  },
}
</script>

<style scoped></style>
