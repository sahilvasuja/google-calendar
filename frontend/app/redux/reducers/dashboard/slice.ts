
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
// import { User, UserState } from './type';


//   const initialState:UserState = {

//     user: [],
//     loading: false,
//   };
  
//   const userSlice=createSlice({
//     name: 'user',
//   initialState,
//     reducers: {
//       fetchAddUserrequest(state:UserState, action: PayloadAction<User>){
//         console.log(state.user,'16')
//         console.log(action.payload,'18');
//         state.user.push(action.payload);
     
//         console.log(state.user,'20');
//       },
//     },
//   })
//   export const {fetchAddUserrequest}=userSlice.actions
//   export default userSlice.reducer;