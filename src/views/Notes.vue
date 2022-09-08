<script setup>
import NotesList from "../components/NotesList.vue";
</script>

<template>
  <div class="container">
    <div class="container__header">
      <div class="container__title">Список заметок</div>
      <div class="container__actions">
        <RouterLink to="/item" class="btn btn-primary">
          <mdicon name="plus" size="16" />
        </RouterLink>
      </div>
    </div>
    <div class="container__content">
      <NotesList />
    </div>
  </div>
</template>

<style lang="scss"></style>
