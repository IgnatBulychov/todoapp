<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import { useNote } from "../composable/note";

const confirm = inject("confirm");
const router = useRouter();

// импортируем необходимые данные и функции для работы с записью
const {
  noteState,
  input,
  editTitleMode,
  currentEditingItem,
  currentEditingNote,
  addNote,
  updateNote,
  deleteNote,
  addItem,
  removeItem,
  history,
  isChanged,
  undo,
  redo,
  commit,
} = useNote();

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

// обработка подтверждения возварата без сохранения
const handleBack = async () => {
  if (!isChanged.value) {
    router.push("/");
    return;
  }
  const isConfirmed = await confirm({
    text: "Вы уверены, что хотите выйти без сохранения?",
  });
  if (isConfirmed) {
    router.push("/");
  }
};

// обработка сохранения заметки
const handleSaveNote = () => {
  currentEditingNote.value !== null ? updateNote() : addNote();
  router.push("/");
};
</script>

<template>
  <div class="edit-note">
    <div class="edit-note__actions">
      <button @click="handleBack" class="btn btn-secondary">
        <mdicon name="arrow-left" size="16" />
      </button>
      <button
        @click="handleSaveNote"
        class="btn btn-primary"
        :disabled="!isChanged"
      >
        <mdicon name="content-save" size="16" />
      </button>
      <button
        @click="undo"
        class="btn btn-primary"
        :disabled="!history.currentCommit"
      >
        <mdicon name="undo" size="16" />
      </button>
      <button
        @click="redo"
        class="btn btn-primary"
        :disabled="history.currentCommit === history.commits.length - 1"
      >
        <mdicon name="redo" size="16" />
      </button>
      <div class="spacer"></div>
      <button
        v-if="currentEditingNote !== null"
        @click="handleDeleteNote(currentEditingNote)"
        class="btn btn-error"
      >
        <mdicon name="delete" size="16" />
      </button>
    </div>
    <div class="edit-note__title">
      <form
        class="title-form"
        @submit.prevent="
          commit();
          editTitleMode = false;
        "
      >
        <input
          v-if="editTitleMode"
          v-model="noteState.note.title"
          type="text"
          placeholder="Название"
        />
        <span v-else>{{ noteState.note.title || "Название не задано" }}</span>
        <div class="title-actions">
          <button v-if="editTitleMode" class="btn btn-success" type="submit">
            <mdicon name="check" size="16" />
          </button>
          <button v-else @click="editTitleMode = true" class="btn btn-warning">
            <mdicon name="pencil" size="16" />
          </button>
        </div>
      </form>
    </div>
    <div class="edit-note__items">
      <form
        v-for="(item, key) in noteState.note.items"
        class="item"
        @submit.prevent="
          commit();
          currentEditingItem = null;
        "
      >
        <div class="item__check">
          <input
            v-model="item.isDone"
            @change="commit"
            type="checkbox"
            :id="`check-${key}`"
          />
        </div>
        <div class="item__text">
          <input
            v-if="currentEditingItem === key"
            v-model="item.text"
            type="text"
          />
          <label v-else :for="`check-${key}`">{{ item.text }}</label>
        </div>
        <div class="item__actions">
          <button
            v-if="currentEditingItem === key"
            type="submit"
            class="btn btn-success"
          >
            <mdicon name="check" size="16" />
          </button>
          <button
            v-else
            @click="currentEditingItem = key"
            class="btn btn-warning"
          >
            <mdicon name="pencil" size="16" />
          </button>
          <button @click="removeItem(key)" class="btn btn-error">
            <mdicon name="delete" size="16" />
          </button>
        </div>
      </form>
      <form @submit.prevent="addItem">
        <div class="item">
          <div class="item__text">
            <input v-model="input" type="text" placeholder="Добавить запись" />
          </div>
          <div class="item__actions">
            <button class="btn btn-primary" type="submit">
              <mdicon name="plus" size="16" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.edit-note {
  box-sizing: content-box;
  &__actions {
    display: flex;
    margin-bottom: 8px;
    > * {
      margin-right: 4px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__title {
    .title-form {
      height: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-actions {
        margin-left: 8px;
      }
    }
  }
  &__items {
    margin-top: 8px;
    .item {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 4px 0;
      margin-bottom: 8px;
      &:last-of-type {
        margin-bottom: 0px;
      }
      &__check {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
      }
      &__text {
        flex: 1;
        label {
          width: 100%;
          display: block;
        }
      }
      &__actions {
        margin-left: 8px;
        display: flex;
        > * {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
