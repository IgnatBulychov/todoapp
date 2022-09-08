import { createStore } from "vuex";

export default createStore({
  state: {
    notes: [],
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    updateNote(state, { key, note }) {
      state.notes[key] = note;
    },
    deleteNote(state, key) {
      state.notes.splice(key, 1);
    },
  },
  actions: {
    initNotes({ commit }) {
      const rawString = localStorage.getItem("notes");
      if (rawString) commit("setNotes", JSON.parse(rawString));
    },
    addNote({ state, commit }, note) {
      localStorage.setItem("notes", JSON.stringify([...state.notes, note]));
      commit("setNotes", [...state.notes, note]);
    },
    updateNote({ commit, state }, { key, note }) {
      commit("updateNote", { key, note });
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote({ commit, state }, key) {
      commit("deleteNote", key);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
  },
});
