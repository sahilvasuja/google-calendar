// import { createSlice } from '@reduxjs/toolkit';
// const initialState={
//     user:[],
//     loading:false
// }
// const userDetailSlice = createSlice({
//     name: 'userDetail',
//   //   initialState: dayjs().month(),
//   initialState:initialState,
//     reducers: {
//       userRequest: (state,action)=>{
//           state.loading=true;
//       },
//       setUser: (state, action) => {
//           console.log("Action Payload:",action.payload);
//         state.user.push(action.payload)
//         console.log(state.user,'18')
//       },
//      userFailure: (state)=>{
//       console.log("fail")
//       state.loading=false
//      }
//     },
//   });
  
//   export const { userRequest,setUser,userFailure } = userDetailSlice.actions;
//   export default userDetailSlice.reducer;
  

  // userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    userId: null,
    userdata: null,
  },
  reducers: {
    setUserId: (state) => {
      console.log("redux");
      // state.userId = action.payload;
    },
    setUserdata: (state, action) => {
      state.userdata = action.payload;
    },
  },
});

export const { setUserId ,setUserdata} = userDetailSlice.actions;
export default userDetailSlice.reducer;



// reducers.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userId: null,
//   userdata: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUserId: (state, action) => {
//       state.userId = action.payload;
//     },
//     setUserdata: (state, action) => {
//       state.userdata = action.payload;
//     },
//   },
// });

// export const { setUserId, setUserdata } = userSlice.actions;

// export default userSlice.reducer;
