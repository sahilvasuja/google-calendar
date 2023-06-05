"use client";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {BsCalendarDate} from "react-icons/Bs";
import React, { useContext, useState } from "react";
import Image from "next/image";
import date from "../../public/date.png";
import calendar from "../../public/calendar.png";
import { setMonthIndex } from "@/app/redux/reducers/monthindex/slice";
// import GlobalContext from "../context/GlobalContext";
export const CalendarHeader = () => {
  const monthIndex = useAppSelector((state) => state.monthIndex);
  const dispatch = useAppDispatch();
  // const [monthIndex, setMonthIndex] = useState(dayjs().month());
  //   const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const handleMonthChange = (newMonthIndex) => {
    console.log(newMonthIndex)
    dispatch(setMonthIndex(newMonthIndex));
  };
  function handlePrevMonth() {
    // setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    // setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    // setMonthIndex(
    //   monthIndex === dayjs().month()
    //     ? monthIndex + Math.random()
    //     : dayjs().month()
    // );
  }
  const todayCss = {
    color: "#007bff",
    borderStyle: "solid",
    borderColor: "#007bff",
    borderRadius: "4px",
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingRight: "4px",
    marginRight: "5px",
  };
  
  
  return (
    <header className="px-4 py-2 gap-4 flex items-center">
       
      <Image src={date} alt="calendar" width={32} height={32} className="mr-2  " />

      <h1 className=" text-xl text-gray-500 fond-bold">Calendar</h1>
      <button
        onClick={handleReset}  style={todayCss}
        className=" rounded py-2 px-4 mr-5  "
      >
        Today
      </button>

      <button onClick={handleMonthChange}>
        <FaAngleLeft className="cursor-pointer text-xl text-gray-600 mx-2" />
      </button>
      <button onClick={handleNextMonth} className='px-3'>
       
        <FaAngleRight className="cursor-pointer text-xl text-gray-600 mx-2" />
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(),monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
};
