 'use client'
import { configureStore, Dispatch } from "@reduxjs/toolkit";
import {  applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchFetchTodos } from "./saga/user";
import { persistReducer, persistStore } from 'redux-persist';
import monthIndex from './reducers/monthindex/slice'
import addEvent from './reducers/addevent/slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootSaga } from "./saga/addevent";
// import cardReducer from "./reducer/cardSlice";
// import userSlice from "./reducer/userSlice";
import storage from './redux-persist/storageFile'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import rootReducer from "./reducers";
const saga = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
    // reducer: {
    //   monthIndex: monthIndex,
    //   addEvent: addEvent,
    //     // card: cardReducer,
    //     // user:userSlice
    //     // postSlice:setPosts,
    //     // userSlice:setUser 
    // },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(saga),
  });
  saga.run(rootSaga);
  export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = Dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



