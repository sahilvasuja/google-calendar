
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
// import { addCard, fetchTodos, setTodos } from '../reducer/cardSlice';
// import { addUser } from '../reducer/userSlice';

async function fetchTodo() {
  try {
    const response = await axios.post('http://localhost:4000/addtodos', {
      task: 'Your task',
      isCompleted: false,
    });
    console.log('Connected to the backend', response);
    return response.data;
  } catch (error) {
    console.log('Failed to connect to the backend', error);
    throw error;
  }
}
 function* fetchUser(userName: string) {
  console.log('USERNAME:',userName);
 yield axios.post('http://localhost:4000/addUser',
   userName
  );
}

function* fetchUserSaga(action: { payload: { userName: string; }; }) {
  // console.log('Saga is working!', action.payload.payload.userName);
  try {
    // const response = yield call(fetchUser, action.payload.payload.userName)
    // console.log('RESPONSE:',response);
    // yield put(addUser(response.data));
   
  } catch (error) {
    console.log('Failed to connect to the backend', error);
  }
}

function* fetchTodosSaga() {
  try {
    // yield put(fetchTodos());
    // const response = yield call(fetchTodo);
    // console.log(response, '22');
    // yield put(setTodos(response));
  } catch (error) {
    console.log('Failed to fetch todos', error);
    // Handle error if needed
  }
}



export function* watchFetchTodos() {
  // yield takeEvery(addUser, fetchUserSaga);
  // yield takeEvery('cardSlice/FETCH_TODOS', fetchTodosSaga);
}
