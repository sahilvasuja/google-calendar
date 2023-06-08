// monthIndexSlice.js
import { getMonth } from '@/utils/helper';
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
const initialState = {
    month: dayjs().month(),
    daysMatrix: getMonth(dayjs().month()),
  };
const monthIndexSlice = createSlice({
  name: 'monthIndex',
//   initialState: dayjs().month(),
initialState:initialState,
  reducers: {
    setMonthIndex: (state, action) => {
      
        console.log(initialState,'15')
        state.month = action.payload.month;
        state.daysMatrix=getMonth(action.payload.month);
    },
   
  },
});

export const { setMonthIndex } = monthIndexSlice.actions;
export default monthIndexSlice.reducer;
