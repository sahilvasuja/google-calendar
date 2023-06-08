
import { createSlice } from '@reduxjs/toolkit';
const initialState={
    event:[],
    loading:false
}
const deleteEventSlice = createSlice({
  name: 'deleteEvent',
//   initialState: dayjs().month(),
initialState:initialState,
  reducers: {
    deleteEventRequest: (state,action)=>{
        console.log("reducer")
        state.loading=true;
    },
    deleteEventSuccess: (state, action) => {
        const eventId = action.payload;
        state.event = state.event.filter(event => event._id !== eventId);
        state.loading = false;
    },
   deleteEventFailure: (state)=>{
    console.log("fail")
    state.loading=false
   }
  },
});

export const { deleteEventSuccess,deleteEventFailure,deleteEventRequest } = deleteEventSlice.actions;
export default deleteEventSlice.reducer;
