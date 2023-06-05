import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './type';
  const initialState:UserState = {
    user: [],
    loading: false,
  };
  
  const leftArrowSlice=createSlice({
    name: 'left',
  initialState,
    reducers: {
      fetchLeftRequest(state:UserState){
        state.loading=true;
      },
      fetchLeftSucess(state:UserState, action: PayloadAction<User>){
        
      },
      fetchLeftFailure(state:UserState, action: PayloadAction<User>){
       state.loading=false
      },
    },
  })
  export const {fetchLeftRequest,fetchLeftSucess, fetchLeftFailure}=leftArrowSlice.actions
  export default leftArrowSlice.reducer;