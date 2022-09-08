<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import { useNote } from "../composable/note";

const confirm = inject("confirm");

const router = useRouter();

// импортируем все записи и функцию удаления
const { notes, deleteNote } = useNote();

// обработка подтверждения удаления
const handleDeleteNote = async (key) => {
  const isConfirmed = await confirm({
    text: "Вы уверены, что хотите удалить заметку?",
  });
  if (isConfirmed) {
    deleteNote(key);
    router.push("/");
  }
};
</script>

<template>
  <div class="notes-list">
    <RouterLink
      :to="`/item?key=${key}`"
      v-for="(note, key) in notes"
      class="note"
    >
      <div class="note__title">
        <strong>{{ note.title || "Без названия" }}</strong>
      </div>
      :&nbsp;
      <div class="note__items">
        {{
          note.items
            .reduce((acc, item) => {
              acc.push(item.text);
              return acc;
            }, [])
            .join(", ")
        }}
      </div>
      <div class="spacer"></div>
      <div class="note__actions">
        <button @click.prevent="handleDeleteNote(key)" class="btn btn-error">
          <mdicon name="delete" size="16" />
        </button>
      </div>
    </RouterLink>
  </div>
  <div v-if="!notes.length" class="notes-list__empty-message">Заметок нет</div>
</template>

<style lang="scss">
.notes-list {
  .note {
    display: flex;
    align-items: center;
    padding: 8px;
    margin-bottom: 4px;
    background: #bbdefb;
    border-radius: 5px;
    cursor: pointer;
    color: inherit;
    &:visited,
    &:active,
    &:hover {
      color: inherit;
    }
    :last-of-type {
      margin-bottom: 0;
    }
    &__title {
      white-space: nowrap;
    }
    &__items {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &__empty-message {
    text-align: center;
  }
}
</style>
