// monthIndexSlice.js
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const monthIndexSlice = createSlice({
  name: 'monthIndex',
  initialState: dayjs().month(),
  reducers: {
    setMonthIndex: (state, action) => {
        console.log("object",action.payload);
        
      return action.payload;
    },
  },
});

export const { setMonthIndex } = monthIndexSlice.actions;
export default monthIndexSlice.reducer;
