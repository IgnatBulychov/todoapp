import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useHistory } from "../composable/history";
import { deepCopy } from "../helpers/deepCopy";

export function useNote() {
  const input = ref("");
  const currentEditingNote = ref(null);
  const currentEditingItem = ref(null);
  const editTitleMode = ref(false);

  const store = useStore();
  const route = useRoute();

  // получаем все записи
  const notes = store.state.notes;

  // инициализируем объект заметки
  let noteState = reactive({
    note: {
      title: "",
      items: [],
    },
  });

  // если в запросе есть номер заметки, заполняем ей соостояние
  if (route.query.key) {
    currentEditingNote.value = Number(route.query.key);
    noteState.note = deepCopy(store.state.notes[route.query.key]);
  }

  // инициализируем хук отвечающий за хранение действий пользовтеля, передаем туда текущую заметку
  const { history, isChanged, undo, redo, commit } = useHistory(noteState);

  // функции работы с записями в заметке
  const addItem = () => {
    if (!input.value) return;
    noteState.note.items.push({
      text: input.value,
      isDone: false,
    });
    input.value = "";
    commit();
  };

  const removeItem = (key) => {
    noteState.note.items.splice(key, 1);
    currentEditingItem.value = null;
    commit();
  };

  // функции работы с заметками
  const addNote = () => {
    store.dispatch("addNote", deepCopy(noteState.note));
  };

  const updateNote = () => {
    store.dispatch("updateNote", {
      key: currentEditingNote.value,
      note: deepCopy(noteState.note),
    });
  };

  const deleteNote = (key) => {
    store.dispatch("deleteNote", key);
  };

  return {
    noteState,
    notes,
    addNote,
    updateNote,
    deleteNote,
    currentEditingNote,
    deleteNote,
    input,
    editTitleMode,
    currentEditingItem,
    addItem,
    removeItem,
    history,
    isChanged,
    undo,
    redo,
    commit,
  };
}
