import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { addEventApi } from "@/api/addEvent";
import {
    userRequest,setUser,userFailure
  } from "../reducers/userdetail/slice";
  