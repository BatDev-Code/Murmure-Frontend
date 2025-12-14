import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const chaptersSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {
    addIndividualChapter: (state, action) => {
      state.push(action.payload);
    },
    replaceAllChapters: (state, action) => {
      state = action.payload;
    },
  },
});

export const { addIndividualChapter, replaceAllChapters } = chaptersSlice.actions;

export default chaptersSlice.reducer;
