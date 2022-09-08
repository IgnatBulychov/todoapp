<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("initNotes");
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
