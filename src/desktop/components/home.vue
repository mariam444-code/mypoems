<template>
  <div id="home">
    <FireCanvas />
    <div class="overlay">
      <h1>Façade</h1>
      <p>Poems that burn through silence</p>
    </div>
  </div>
</template>

<script>
import FireCanvas from "./firecanvas.vue"; //

export default {
  name: "Home",
  components: { FireCanvas }, //
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: black;
  color: white;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

h1 {
  font-size: 3rem;
  letter-spacing: 2px;
  text-shadow: 0 0 20px #ff9900;
}
</style>
