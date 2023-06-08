import { setEvent } from '@/app/redux/reducers/addevent/slice';
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { editEventApi } from "@/api/addEvent";
import { editEventFailure, editEventSuccess } from '../reducers/editevent/slice';
import { toast } from 'react-toastify';
function* workEditEvent(action: { payload: any }) {
  
  const { payload } = action;
  
  console.log("Saga: workAddEvent started");
  try {
    console.log("Edit saga",payload)
    const response=yield call( editEventApi,payload
    );
    const data = response.data;
    console.log("Saga: Received data", data);
    yield put(editEventSuccess(data.message));
    yield put(setEvent(data))
    toast.success('Event updated successfully');
  } catch (error) {
    console.log("Saga: Error occurred", error);
    yield put(editEventFailure(error));
    toast.error('Failed to Update the event');
  }
}
export default workEditEvent