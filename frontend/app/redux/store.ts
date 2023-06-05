 'use client'
import { configureStore, Dispatch } from "@reduxjs/toolkit";
import {  applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchFetchTodos } from "./saga/user";
import monthIndex from './reducers/monthindex/slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import cardReducer from "./reducer/cardSlice";
// import userSlice from "./reducer/userSlice";
const saga = createSagaMiddleware();
export const store = configureStore({
    reducer: {
      monthIndex: monthIndex,
        // card: cardReducer,
        // user:userSlice
        // postSlice:setPosts,
        // userSlice:setUser 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
  });
  saga.run(watchFetchTodos);
  export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = Dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



