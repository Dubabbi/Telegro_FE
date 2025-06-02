import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userRole: null,
  },
  reducers: {
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
    clearUserRole(state) {
      state.userRole = null;
    },
    checkAdminRole(state) {
      return state.userRole === 'ADMIN';
    }
  },
});

export const { setUserRole, clearUserRole, setAuthState } = authSlice.actions;
export default authSlice.reducer;
