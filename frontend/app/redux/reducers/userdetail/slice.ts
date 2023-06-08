import { createSlice } from '@reduxjs/toolkit';
const initialState={
    user:[],
    loading:false
}
const userDetailSlice = createSlice({
    name: 'userDetail',
  //   initialState: dayjs().month(),
  initialState:initialState,
    reducers: {
      userRequest: (state,action)=>{
          state.loading=true;
      },
      setUser: (state, action) => {
          console.log("Action Payload:",action.payload);
        state.user.push(action.payload)
        console.log(state.user,'18')
      },
     userFailure: (state)=>{
      console.log("fail")
      state.loading=false
     }
    },
  });
  
  export const { userRequest,setUser,userFailure } = userDetailSlice.actions;
  export default userDetailSlice.reducer;
  