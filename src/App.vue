<template>
  <div id="app">
    <div class="modal">
      <button @click="visiblePopup = true">Налоговый вычет</button>
    </div>
    <v-popup
      v-if="visiblePopup"
      @closePopup="closePopup"
      :visiblePopup="visiblePopup"
    />
  </div>
</template>

<script>
import vPopup from "./components/ModalWindow.vue";
export default {
  name: "App",
  components: {
    vPopup,
  },
  data() {
    return {
      visiblePopup: false,
    };
  },
  methods: {
    closePopup() {
      this.visiblePopup = false;
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  background: linear-gradient(
      255.35deg,
      #dc3131 0.83%,
      rgba(255, 79, 79, 0) 108.93%
    ),
    #ff5e56;
  height: 100vh;
}
.modal {
  position: relative;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  :hover {
    transition: 0.5s;
    background-color: #fff;
    color: #000;
  }
  :not(:hover) {
    transition: 0.5s;
  }
  :disabled,
  [disabled] {
    border: 1px solid #bec5cc;
    background-color: #bec5cc;
    color: #fff;
    cursor: default;
  }
}
button {
  font-size: 16px;
  background-color: inherit;
  padding: 16px 32px;
  color: #fff;
  border: 1px solid #ffffff;
  border-radius: 6px;
  cursor: pointer;
}
</style>
