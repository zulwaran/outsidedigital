<template>
  <div class="popup__wrapper" ref="popup__wrapper">
    <div class="v-popup">
      <div class="v-popup__content">fgdhfgh</div>
      <div class="v-popup__footer">
        <button @click="closePopup">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup",
  props: {
    visiblePopup: {
      type: Boolean,
    },
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
  mounted() {
    document.addEventListener("click", (item) => {
      if (item.target === this.$refs["popup__wrapper"]) {
        this.closePopup();
      }
    });
  },
};
</script>

<style lang="scss">
.popup__wrapper {
  background: rgba(64, 64, 64, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  min-height: 100vh;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}

.v-popup {
  padding: 16px;
  position: fixed;
  top: 50px;
  width: 320px;
  background: #fff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

button {
  margin-top: 10px;
}
</style>