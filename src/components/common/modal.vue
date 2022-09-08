<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="modal__text">{{ text }}</div>
      <div class="modal__actions">
        <button class="btn btn-secondary" @click="handleReject">
          {{ rejectText }}
        </button>
        <button class="btn btn-success" @click="handleConfirm">
          {{ confirmText }}
        </button>
      </div>
    </div>
    <div class="modal-bg" @click="handleReject"></div>
  </div>
</template>

<script>
export default {
  name: "Confirm",
  props: {
    text: {
      type: String,
      default: "",
    },
    confirmText: {
      type: String,
      default: "Да",
    },
    rejectText: {
      type: String,
      default: "Нет",
    },
    resolve: {
      type: Function,
    },
  },
  setup(props) {
    function handleClose() {
      if (props.resolve) {
        props.resolve(null);
      }
    }

    function handleConfirm() {
      if (props.resolve) {
        props.resolve(true);
      }
    }

    function handleReject() {
      if (props.resolve) {
        props.resolve(false);
      }
    }

    return {
      handleClose,
      handleConfirm,
      handleReject,
    };
  },
};
</script>

<style lang="scss">
.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 75vh;
  .modal {
    background: #fff;
    border-radius: 5px;
    padding: 16px;
    max-width: 320px;
    z-index: 1;
    &__text {
      text-align: center;
    }
    &__actions {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
    }
  }
  .modal-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #00000020;
  }
}
</style>
