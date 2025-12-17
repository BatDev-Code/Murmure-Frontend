import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
  username: '',
  userToken: '',
  progressNb: 0,
};

const userConnectionSlice = createSlice({
  name: 'userConnection',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isConnected = true;
      state.username = action.payload.username;
      state.userToken = action.payload.token;
      state.progressNb = action.payload.progressNb || 0;
    },
    logout: (state) => {
      state.isConnected = false;
      state.username = '';
      state.userToken = '';
      state.progressNb = 0;
    },
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updateProgressNb: (state, action) => {
      state.progressNb = action.payload;
    },
  },
});

export const { login, logout, updateUsername, updateProgressNb } = userConnectionSlice.actions;
export default userConnectionSlice.reducer;