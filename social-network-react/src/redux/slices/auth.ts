import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isAuth = false;
      localStorage.setItem("accessKey", "");
      localStorage.setItem("refresh_token", "");
    },
    getIsAuth: (state) => {
      console.log("in auth slice", state.isAuth);
    },
    setIsAuth: (state) => {
      state.isAuth = true;
    },
  },
});

export const { actions, reducer } = authSlice;
