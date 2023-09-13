<template>
  <div class="container">
    <h1>Sadama lisamine/ Sadama muutmine</h1>
    <div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Sadama nimi</span>
        <input type="text" class="form-control" aria-describedby="basic-addon1">
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">Maakond
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Harju</a></li>
          <li><a class="dropdown-item" href="#">Pärnu</a></li>
          <li><a class="dropdown-item" href="#">Kolmas maakond</a></li>
        </ul>
        <input type="text" class="form-control" aria-label="Text input with dropdown button">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">Sadama koordinaadid</span>
        <input type="text" class="form-control" placeholder="põhjapikkus">
        <input type="text" class="form-control" placeholder="lõunalaius">
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">Sissesõidu väikseim sügavus
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Mingi sügavus</a></li>
        </ul>
        <input type="text" class="form-control" aria-label="Text input with dropdown button">
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">Sissesõidu väikseim laius
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Mingi laius</a></li>
        </ul>
        <input type="text" class="form-control" aria-label="Text input with dropdown button">
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">Kapteni nimi
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Mingi kapteni nimi</a></li>
        </ul>
        <input type="text" class="form-control" aria-label="Text input with dropdown button">
      </div>
      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect01">Kohtade arv</label>
        <select class="form-select" id="inputGroupSelect01">
          <option selected>Vali...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="container">
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-secondary">Lisa teenused</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-secondary">Lisa / muuda pilt</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-danger">Lisa sadam / Muuda sadamat</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditHarbourView',
  methods: {}
}

</script>