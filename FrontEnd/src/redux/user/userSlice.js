import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  currentEvent: null,
  vendors: [],
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    eventStart: (state) => {
      state.loading = true;
    },
    eventSuccess: (state, action) => {
      state.currentEvent = action.payload;
      state.loading = false;
      state.error = null;
    },
    eventFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    vendorStart: (state) => {
      state.loading = true;
    },
    vendorSuccess: (state, action) => {
      state.vendors = action.payload;
      state.loading = false;
      state.error = null;
    },
    vendorFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  eventFailure,
  eventStart,
  eventSuccess,
  vendorFailure,
  vendorStart,
  vendorSuccess,
} = userSlice.actions;

export default userSlice.reducer;
