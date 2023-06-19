import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//     user: null,
//     loading: false,
//     error: null,
// };

const loginSlice = createSlice({
  name: 'loginUser',
  // initialState,
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      console.log(action.payload,'21');
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    // loginRequest: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // loginSuccess: (state, action) => {
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    //   state.loading = false;
    //   state.error = null;
    // },
    // loginFailure: (state,action) => {
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // logout: (state) => {
    //   state.isAuthenticated = false;
    //   state.user = null;
    //   state.loading = false;
    //   state.error = null;
    // },
  },
});

// export const { loginRequest, loginSuccess, loginFailure,logout } = loginSlice.actions;
// export default loginSlice.reducer;
export const { setUser, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;


