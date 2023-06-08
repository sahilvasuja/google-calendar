
import { createSlice } from '@reduxjs/toolkit';
const initialState={
    event:[],
    loading:false
}
const addEventSlice = createSlice({
  name: 'addEvent',
//   initialState: dayjs().month(),
initialState:initialState,
  reducers: {
    eventRequest: (state,action)=>{
        state.loading=true;
    },
    setEvent: (state, action) => {
        console.log("Action Payload:",action.payload);
      state.event=(action.payload)
      console.log(state.event,'18')
    },
   eventFailure: (state)=>{
    console.log("fail")
    state.loading=false
   },
   
  },
});

export const { setEvent,eventFailure,eventRequest } = addEventSlice.actions;
export default addEventSlice.reducer;
