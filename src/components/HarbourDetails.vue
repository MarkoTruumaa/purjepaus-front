<template>
  <div>
    <h2>Valitud sadama ID = {{selectedHarbourId}}</h2>
  </div>
</template>


<script>
export default {
  name: 'HarbourDetails',
  props: {
    selectedHarbourId: Number
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>