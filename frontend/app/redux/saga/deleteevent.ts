import { setEvent } from '@/app/redux/reducers/addevent/slice';
import { all, call, fork, put, takeEvery } from "redux-saga/effects";import axios from "axios";
import {
    deleteEventSuccess,deleteEventFailure,deleteEventRequest
} from "../reducers/deleteevent/slice";
import { deleteEventApi } from "@/api/addEvent";
import { toast } from 'react-toastify';
function* workDeleteEvent(action: { payload: any }) {
  
  const { payload } = action;
  
  console.log("Saga: workAddEvent started");
  try {
    console.log("delete saga",payload)
    const response=yield call( deleteEventApi,payload
    );
    const data = response.data;
    console.log("Saga: Received data", data);
    toast.success('Event deleted successfully');
    yield put(deleteEventSuccess(data.message));
    yield put(setEvent(data))
  } catch (error) {
    console.log("Saga: Error occurred", error);
    toast.error('Failed to delete the event');
    yield put(deleteEventFailure(error));
  }
}
export default workDeleteEvent