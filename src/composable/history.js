import { ref, reactive } from "vue";
import { deepCopy } from "../helpers/deepCopy";

export function useHistory(noteState) {
  const isChanged = ref(false);

  // инициализируем объект истории, и указываем первый снимок истории как текущее состояние заметки
  let history = reactive({
    currentCommit: 0,
    commits: [deepCopy(noteState.note)],
  });

  // обратотка возврата к предыдущему снимку истории
  const undo = () => {
    noteState.note = deepCopy(history.commits[history.currentCommit - 1]);
    history.commits.push(deepCopy(noteState.note));
    history.currentCommit--;
  };

  // обратотка перехода к следующему снимку истории
  const redo = () => {
    noteState.note = deepCopy(history.commits[history.currentCommit + 1]);
    history.currentCommit++;
  };

  // добавить снимко истории
  const commit = () => {
    history.commits.push(deepCopy(noteState.note));
    history.currentCommit = history.commits.length - 1;
    isChanged.value = true;
  };

  return { history, isChanged, undo, redo, commit };
}
