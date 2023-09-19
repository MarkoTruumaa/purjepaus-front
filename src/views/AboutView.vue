<template>
  <div>
  <h1>Oleme Purjepausi tiim</h1>


  Tegutseme aastast 2023 ja siin saad jätta meile tagasisidet.


  <div class="container py-4">

    <form id="contactForm">

      <!-- Name input -->
      <div class="mb-3">
        <label class="form-label" for="name">Sinu nimi</label>
        <input class="form-control" id="name" type="text" placeholder="Name" />
      </div>

      <!-- Email address input -->
      <div class="mb-3">
        <label class="form-label" for="emailAddress">Siia saab sulle kirju saata</label>
        <input class="form-control" id="emailAddress" type="email" placeholder="Email Address" />
      </div>

      <!-- Message input -->
      <div class="mb-3">
        <label class="form-label" for="message">Sinu sõnum meile</label>
        <textarea class="form-control" id="message" type="text" placeholder="Message" style="height: 10rem;"></textarea>
      </div>

      <!-- Form submit button -->
      <div class="d-grid">
        <button class="btn btn-dark btn-lg" type="submit">Pane kiri teele</button>
      </div>

    </form>
    </div>
  </div>

</template>


<script>
export default {
  name: 'AboutView'
}


</script>