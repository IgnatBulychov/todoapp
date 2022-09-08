import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Notes",
      component: () => import("../views/Notes.vue"),
    },
    {
      path: "/item",
      name: "Note",
      component: () => import("../views/Note.vue"),
    },
  ],
});

export default router;
