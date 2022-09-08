import { createVNode, render } from "vue";
import ModalComponent from "../components/common/modal.vue";

export default {
  install(app) {
    const handler = async (options) => {
      let node = null;
      const container = document.createElement("div");

      const response = await new Promise((resolve) => {
        const vm = createVNode(ModalComponent, {
          ...options,
          resolve,
        });
        render(vm, container);

        node = container.firstElementChild;
        document.body.appendChild(node);
      });

      document.querySelector("body").removeChild(node);

      return response;
    };

    app.provide("confirm", handler);
  },
};
