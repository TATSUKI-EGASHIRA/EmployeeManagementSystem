// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userData: any[] | null;
  expiryTimestamp: number | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: null,
  expiryTimestamp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userData: any[]; expiryTimestamp: number }>
    ) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.expiryTimestamp = action.payload.expiryTimestamp;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.expiryTimestamp = null;
    },
    updateUserData: (state, action: PayloadAction<any[]>) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, updateUserData } = authSlice.actions;

export default authSlice.reducer;
