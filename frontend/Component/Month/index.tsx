import { eventRequest, setEvent } from "@/app/redux/reducers/addevent/slice";
import { useAppDispatch,useAppSelector } from "@/app/redux/store";
import { isValidDateFormat } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { Day } from "../Day";
import { toast, ToastContainer } from 'react-toastify';
import { Modal } from "../Day";
export default function Month({ month }: any) {
  const [showmodal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const [selectedStartHour, setSelectedStartHour] = useState("12");
  const [selectedStartMinute, setSelectedStartMinute] = useState("00");
  const [selectedStartPeriod, setSelectedStartPeriod] = useState("AM");
  const [showToast, setShowToast] =useState(false);
  const [showError, setShowError] = useState(false);
  const loading = useAppSelector((state) => state.addEvent.loading);
  const event = useAppSelector((state) => state.addEvent.event);
  const handlestartTimeChange = (event) => {
    setstartTime(event.target.value);
  };
  const handleendTimeChange = (event) => {
    setendTime(event.target.value);
  };
  const setStartTime = () => {
    const formattedHour = selectedStartPeriod === "PM" && selectedStartHour !== "12" ? parseInt(selectedStartHour) + 12 : selectedStartHour;
    const formattedStartTime = `${formattedHour}:${selectedStartMinute}:${selectedStartPeriod}`;
    setstartTime(formattedStartTime);
  };
  const setEndTime = () => {
    const formattedHour = selectedPeriod === "PM" && selectedHour !== "12" ? parseInt(selectedHour) + 12 : selectedHour;
    const formattedEndTime = `${formattedHour}:${selectedMinute}:${selectedPeriod}`;
    setendTime(formattedEndTime);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const monthCss = {
    display: "grid",
    gridTemplateColumns: " repeat(7, 1fr)",
    color: "#000000",
    padding: "15px",
  };
  const handleDateClick = (event) => {
    setShowModal(true);
    setDate(event.target.textContent)
    console.log(event.target.textContent);

    // onDateClick(day); // Pass the clicked date to the parent component
  };
  const dispatch = useAppDispatch();
  function handleaddEvent() {
    console.log(date,'40 han')
    if (!inputValue || !date || !startTime || !endTime) {
      // Display an error message or perform any other necessary action
      setShowError(true);
      console.log("Please fill in all fields");
      // setShowModal(false)
      return;
    }
    else{
      setShowError(false);
      // if (!isValidDateFormat(date)) {
      //   setDateError("Invalid date format. Please use DD-MM-YY");
      //   console.log("Invalid date format. Please use DD-MM-YY");
      //   return;
      // }
      // else{
      //   setDateError("")
      // }
    }
    setShowError(false);
    dispatch(
      eventRequest({
        title: inputValue,
        startTime: startTime,
        endTime: endTime,
        date:date

      })
    );

   
    setstartTime("");
    setendTime("");
    setInputValue("");
    setDate("")
    setShowModal(false)
  }
  // useEffect(() => {
  //   if (event && showToast) { 
  //     toast.success('Event added successfully!');
  //   }
  // }, [event,showToast]);
  // useEffect(() => {
  //   if (!loading && showToast) {
  //     toast.error('Failed to add event. Please try again.');
  //   }
  // }, [loading, showToast]);
  // useEffect(() => {
  //   setShowToast(false);
  // }, []);
  return (
    <>
   {showmodal ? (
        <>
        
<div className="fixed  flex items-center justify-center top-1/2 left-1/2  z-50">
  <div className="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden">
   {/* <div className="fixed inset-0 flex rounded-xl w-2/12 h-5/12 items-center justify-center z-50 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4'">
  <div className="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden"> */}
   
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white p-8 outline-none focus:outline-none">
      <div className="flex items-start justify-between p-8  border-b border-solid border-gray-300 rounded-t">
        <h3 className=" text-black text-xl font-semibold">Add Event</h3>
        <button
          className="bg-transparent border-0 text-black float-right focus:outline-none"
          onClick={() =>{
            setShowModal(false)
            setDateError("");
          } }
        >
          <span className="text-black opacity-70 text-xl h-6 w-6  block bg-gray-400 py-0 rounded-full">
            ×
          </span>
        </button>
      </div>
      <div className="relative p-6 flex-auto">
        <div className="modal-content gap-4 border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <input
            placeholder="Add Event"
            className="text-black bg-gray-100 py-2 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
           {showError && !inputValue && <p style={{ color: "red" }}>Please enter a value.</p>}

     
          <input
            placeholder="Date"
            className="text-black bg-gray-100 py-2 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={handleDateChange}
            // readOnly
            required
          />
          {showError && !date && <p style={{ color: "red" }}>Please select a date.</p>}

          {dateError && <p style={{ color: "red" }}>{dateError}</p>}
          <div>
        <select className="text-black"
          value={selectedStartHour}
          onChange={(e) =>{ setSelectedStartHour(e.target.value)
             setStartTime();
          
          }
        }
         
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        :
        <select
          value={selectedStartMinute} className='text-black'
          onChange={(e) =>{

            setSelectedStartMinute(e.target.value)
            setStartTime();
          } 
        }
        >
         {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
    <option key={minute} value={minute.toString().padStart(2, "0")}>
      {minute.toString().padStart(2, "0")}
    </option>
  ))}
        </select>
        <select
          value={selectedStartPeriod} className='text-black'
          onChange={(e) =>{
            setSelectedStartPeriod(e.target.value)
            setStartTime();
          }
          }
        >
          <option className='text-black' value="AM">AM</option>
          <option className='text-black' value="PM">PM</option>
        </select>
      </div>
      {showError && !startTime && <p style={{ color: "red" }}>Please enter a start time.</p>}

          {/* <input
            placeholder="Starting Time"
            className="text-black bg-gray-100 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={startTime}
            onChange={handlestartTimeChange}
            required
          /> */}
          {/* <input
            placeholder="Ending Time"
            className="text-black bg-gray-100 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endTime}
            onChange={handleendTimeChange}
            required
          /> */}
           <div>
        <select className="text-black"
          value={selectedHour}
          onChange={(e) =>{ setSelectedHour(e.target.value)
             setEndTime();
          
          }
        }
          
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        :
        <select
          value={selectedMinute} className='text-black'
          onChange={(e) =>{

            setSelectedMinute(e.target.value)
            setEndTime();
          } 
        }
        >
         {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
    <option key={minute} value={minute.toString().padStart(2, "0")}>
      {minute.toString().padStart(2, "0")}
    </option>
  ))}
        </select>
        <select
          value={selectedPeriod} className='text-black'
          onChange={(e) =>{
            setSelectedPeriod(e.target.value)
            setEndTime();
          }
          }
        >
          <option className='text-black' value="AM">AM</option>
          <option className='text-black' value="PM">PM</option>
        </select>
      </div>
      {showError && !endTime && <p style={{ color: "red" }}>Please enter an end time.</p>}

    
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleaddEvent}
              className="px-8 w-full py-2 bg-red-500 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out ml-2"
            >
              Save Changes
            </button>
            {/* <ToastContainer /> */}
            {/* <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-gray-300 text-black font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400 active:bg-gray-500 transition duration-150 ease-in-out ml-2"
            >
              Cancel
            </button> */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


        </>
      ) : null}
      <div style={monthCss}>
        {month.map((row: any[], i: any) => {
          return row.map((day: any, idx: React.Key | null | undefined) => (
            <Day
              day={day}
              key={idx}
              rowIdx={i}
              handleDateClick={handleDateClick}
            />
          ));
        })}
      </div>
    </>
  );
}
