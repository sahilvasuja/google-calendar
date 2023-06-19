import { setEvent } from '@/app/redux/reducers/addevent/slice';
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { editEventApi, loginApi } from "@/api/addEvent";
import { toast } from 'react-toastify';
// import { loginSuccess,loginFailure } from '../reducers/login/slice';
import { setUserdata, setUserId } from '../reducers/userdetail/slice';
function* workLogin(action: { payload: any }) {
  
  // const { payload } = action;
  
  console.log("Saga: workLogin started");


  try {
    const token = yield call(getAccessTokenSilently);
    const response = yield call(loginApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(setUserdata(response.data));
    yield put(setUserId(response.data._id));
    // toast.success('login success')
  } catch (error) {
    console.log(error.message);
    // toast.error('login required')
  }



  // try {
  //   const { email, password } = action.payload;
  //   console.log("login saga",email, password)
  //   const response=yield call( loginApi,email, password);
  //   const user = response.data;
  //   console.log("Saga: Received data", user);
  //   yield put(loginSuccess(user));
  //   yield put(setEvent(data))
  //   // toast.success('Event updated successfully');
  // } catch (error) {
  //   console.log("Saga: Error occurred", error);
  //   yield put(loginFailure(error));
  // }
}
export default workLogin


