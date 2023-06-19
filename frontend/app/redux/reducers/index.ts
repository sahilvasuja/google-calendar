import { combineReducers } from '@reduxjs/toolkit';
import monthIndex from './monthindex/slice'
import addEvent from './addevent/slice'
import deleteEvent from './deleteevent/slice'
import editEvent from './editevent/slice'
import loginUser from './login/slice'

// Define a Redux root reducer called 'rootReducer'
export const rootReducer = (state, action) => {
  // If the action being dispatched is a 'SIGNOUT_REQUEST' action
  if (action.type === 'SIGNOUT_REQUEST') {
    // Remove the persisted state for the 'root' key from local storage
    localStorage.removeItem('persist:root');

    // Reset the state of all reducers to their initial state by calling the
    // 'appReducer' with an undefined state and the 'SIGNOUT_REQUEST' action
    return appReducer(undefined, action);
  }

  // Call the 'appReducer' with the current state and the action being dispatched
  // to handle the action and return the new state
  return appReducer(state, action);
};

// Define the 'appReducer' by combining several individual reducers into a single reducer
const appReducer = combineReducers({
monthIndex:monthIndex,
addEvent:addEvent,
deleteEvent:deleteEvent,
editEvent:editEvent,
loginUser:loginUser

});
export default rootReducer;
