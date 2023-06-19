import { SetStateAction, useState } from "react";
import { useAppDispatch } from "@/app/redux/store";
import { editEventRequest } from "@/app/redux/reducers/editevent/slice";
interface Modaltypes{
  eventEndTime:String,
  eventTitle:String,
  eventStartTime:String,
  eventId:any,
  eventDate:String,
  closeEventModal: ()=>void
}
export const EventModal = ({eventStartTime,eventEndTime,eventDate,eventTitle,eventId,closeEventModal }) =>{
   
  const [inputValue, setInputValue] = useState(eventTitle);
  const [startTime, setstartTime] = useState(eventStartTime);
  const [endTime, setendTime] = useState(eventEndTime);
  const dispatch = useAppDispatch();
  function handleeditEvent() {

    // if (!inputValue || !date || !startTime || !endTime) {
    //   // Display an error message or perform any other necessary action
    //   console.log("Please fill in all fields");
    // //   setShowModal(false)
    // //   return;
    // }
    dispatch(
        editEventRequest({
        title: inputValue,
        startTime: startTime,
        endTime: endTime,
        date:eventDate,
        eventId:eventId
      })
    );
    setstartTime("");
    setendTime("");
    setInputValue("");
    closeEventModal()
  }
  const handlestartTimeChange = (event) => {
    console.log(event.target.value);
    setstartTime(event.target.value);
  };
  const handleendTimeChange = (event) => {
    console.log(event.target.value);
    setendTime(event.target.value);
  };
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };
 
  
    return(
        <div className="fixed  flex items-center justify-center top-1/2 left-1/2  z-50">
  <div className="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden">
   {/* <div className="fixed inset-0 flex rounded-xl w-2/12 h-5/12 items-center justify-center z-50 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4'">
  <div className="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden"> */}
   
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white p-8 outline-none focus:outline-none">
      <div className="flex items-start justify-between p-8  border-b border-solid border-gray-300 rounded-t">
        <h3 className=" text-black text-xl font-semibold">Update Event</h3>
        <button
          className="bg-transparent border-0 text-black float-right focus:outline-none"
          onClick={() => closeEventModal()}
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
            className="text-black bg-gray-100 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={handleInputChange}
           
          />
       
          <input
            placeholder="Date"
            className="text-black bg-gray-100 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={eventDate}
            readOnly
          />
          <input
            placeholder="Starting Time"
            className="text-black bg-gray-100 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={startTime}
            onChange={handlestartTimeChange}
          />
          <input
            placeholder="Ending Time"
            className="text-black bg-gray-100 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endTime}
            onChange={handleendTimeChange}
           
          />
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleeditEvent}
              className="px-8 w-full py-2 bg-red-500 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out ml-2"
            >
              Update Changes
            </button>
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
    )
}