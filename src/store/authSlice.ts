import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: null as string | null,
    email: null as string | null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.uid = null;
      state.email = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;