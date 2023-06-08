import { deleteEventRequest } from '@/app/redux/reducers/deleteevent/slice';
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  eventFailure,
  eventRequest,
  setEvent,
} from "../reducers/addevent/slice";
import { addEventApi } from "@/api/addEvent";
import workDeleteEvent from './deleteevent';
import { editEventRequest } from '../reducers/editevent/slice';
import workEditEvent from './editevent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* workAddEvent(action: { payload: any }) {
  
  const { payload } = action;
  
  console.log("Saga: workAddEvent started");
  try {
    console.log("in try")
    // const response = yield call(axios.post, "http://localhost:4000/addEvent",
    const response=yield call( addEventApi,payload
    );
    const data = response.data;
    console.log("Saga: Received data", data);
    toast.success('Event added successfully');
    yield put(setEvent(data));
  } catch (error) {
    console.log("Saga: Error occurred", error);
    toast.error('Failed to add event');
    yield put(eventFailure(error));
  }
}

function* watchSaga() {
  console.log("Saga: watchSaga started");
  yield takeEvery(eventRequest.type, workAddEvent);
  yield takeEvery(deleteEventRequest.type,workDeleteEvent)
  yield takeEvery(editEventRequest.type,workEditEvent)
}
export function* rootSaga() {
  yield all([watchSaga() ]);
}
export default rootSaga;


