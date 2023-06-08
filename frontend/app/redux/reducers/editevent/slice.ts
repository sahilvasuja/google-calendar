
import { createSlice } from '@reduxjs/toolkit';
const initialState={
    event:[],
    loading:false
}
const editEventSlice = createSlice({
  name: 'editEvent',
//   initialState: dayjs().month(),
initialState:initialState,
  reducers: {
    editEventRequest: (state,action)=>{
        console.log(action.payload.eventId)
        state.loading=true;
    },
    editEventSuccess: (state, action) => {
        const updatedEvent = action.payload;
        state.event = state.event.map(event => {
            if (event._id === updatedEvent._id) {
              return updatedEvent;
            }
            return event;
          });
          console.log(state.event,'24')
          state.loading = false;
        
    },
    editEventFailure: (state)=>{
    console.log("fail")
    state.loading=false
   }
  },
});

export const { editEventRequest,editEventSuccess,editEventFailure } = editEventSlice.actions;
export default editEventSlice.reducer;
