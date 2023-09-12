<template>
  <div class="container">
    <h1>Täpne sadamaotsing</h1>
    <div class="row">
      <div class="col">
        <table class="table table-borderless">
          <tbody>
          <tr>
            <td>
              <div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                  Maakonnad
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Harju</a></li>
                  <li><a class="dropdown-item" href="#">Pärnu</a></li>
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                  Sissesõidu väikseim sügavus
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">2 meetrit</a></li>
                  <li><a class="dropdown-item" href="#">4 meetrit</a></li>
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                  Sissesõidu väikseim laius
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">2 meetrit</a></li>
                  <li><a class="dropdown-item" href="#">4 meetrit</a></li>
                </ul>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div><h3>TEENUSED</h3></div>
      <table class="table table-borderless col-6 ">
        <tbody>
        <tr>
          <td>
            <div class="form-check">
              <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Valik 1
              </label>
            </div>
          </td>
          <td>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Valik 2
              </label>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <button type="button" class="btn btn-success">OTSI</button>
  </div>
</template>

<script>
export default {
  name: 'SearchView'
}

</script>
