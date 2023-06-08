import React, { useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { deleteEventRequest } from "@/app/redux/reducers/deleteevent/slice";
import { editEventRequest } from "@/app/redux/reducers/editevent/slice";
import { EventModal } from "../EventModal";
const Modal = ({ isOpen, onClose,eventID,eventDate ,eventEndTime,eventTitle,eventStartTime}) => {
  const [showEventModal,setShowEventModal]=useState(false)
  const dispatch = useAppDispatch();
  const modalStyles = 'fixed top-1/2 left-1/2  bg-white p-4';
  const deleteEvent=(eventID,onClose)=>{
    console.log(eventID,'7')
    dispatch(deleteEventRequest(eventID))
    onClose()
  }
  const editEvent=(eventID,onClose)=>{
    console.log(eventID,'7')
    onClose()
    setShowEventModal(true)
    // dispatch(editEventRequest(eventID))

  }
  const closeEventModal = () => {
    setShowEventModal(false);
  };
  const events = useSelector(state => state.addEvent.event);
  // console.log(events,'33');
  return (
    <>
    {
showEventModal && <EventModal eventEndTime={eventEndTime} eventTitle={eventTitle} eventStartTime={eventStartTime} eventDate={eventDate} eventId={eventID} closeEventModal={closeEventModal} />
    }
      {isOpen && (
      
//         <div className={modalStyles}>
//   <div className="bg-white rounded-xl shadow-lg">
//     <div className="flex items-center justify-between p-4 border-b border-solid border-gray-300 rounded-xl">
//         <div className="flex items-center space-x-4">
//         <button className="p-2 rounded-lg bg-blue-500 text-white">Add</button>
//         <button className="p-2 rounded-lg bg-red-500 text-white">Delete</button>
//         <button className="p-2 rounded-lg bg-yellow-500 text-white">Edit</button>
//         <button className="p-2 rounded-lg bg-gray-500 text-white" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//     <div className="p-4 ">
//       <p className="text-gray-700 mb-4">This is the modal content</p>
//       <div className="flex flex-col space-y-2">
//         <div className="flex items-center">
//           <span className="text-gray-700 font-semibold">Start Time:</span>
//           <span className="text-gray-600 ml-2">10:00 AM</span>
//         </div>
//         <div className="flex items-center">
//           <span className="text-gray-700 font-semibold">End Time:</span>
//           <span className="text-gray-600 ml-2">11:00 AM</span>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>



//  <div className={modalStyles}>
// <div className="bg-white rounded-lg shadow-lg">
//   <div className="flex items-start justify-between p-6 border-b border-solid border-gray-300 rounded-lg">
//     <button className="p-2 rounded-lg bg-blue-500 text-lg text-white"></button>
//         <button className="p-2 rounded-lg text-lg text-white"  onClick={()=>deleteEvent(eventID,onClose)} >Delete</button>
//         <button className="p-2 rounded-lg text-lg text-white" onClick={()=>editEvent(eventID,onClose,eventTitle,eventStartTime,eventEndTime)}>Edit</button>
         
//     <button
//       className="bg-transparent border-0 text-xl text-black float-right focus:outline-none"
//       onClick={onClose}
//     >
//       <span className="text-black opacity-70 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
//         ×
//       </span>
//     </button>
//   </div>
//   <div className="p-4">
//     <p className="text-gray-700 mb-4">Title: {eventTitle}</p>
//     <div className="flex flex-col space-y-2">
//     <div className="flex items-center">
//         <span className="text-gray-700 font-semibold">Date:</span>
//         <span className="text-gray-600 ml-2">{eventDate}</span>
//       </div>
//       <div className="flex items-center">
//         <span className="text-gray-700 font-semibold">Start Time:</span>
//         <span className="text-gray-600 ml-2">{eventStartTime}</span>
//       </div>
//       <div className="flex items-center">
//         <span className="text-gray-700 font-semibold">End Time:</span>
//         <span className="text-gray-600 ml-2">{eventEndTime}</span>
//       </div>
//     </div>
//   </div>
// </div>
// </div> 

<div className={modalStyles}>
  <div className="bg-gray-600 rounded-lg shadow-lg">
    <div className="flex items-start justify-between p-14 border-b border-solid  border-gray-600 rounded-lg">
      <button className="p-2 rounded-lg bg-blue-500 text-lg text-white"></button>
      <button className="p-2 rounded-lg bg-blue-500 text-lg text-white"></button>
      <button className="p-2 rounded-lg bg-blue-500 text-lg text-white"></button>
      <button className="p-2 rounded-lg text-lg text-white" onClick={() => deleteEvent(eventID, onClose)}>Delete</button>
      <button className="p-2 rounded-lg text-lg text-white" onClick={() => editEvent(eventID, onClose, eventTitle, eventStartTime, eventEndTime)}>Edit</button>
      <button className="bg-transparent border-0 text-xl text-black float-right focus:outline-none" onClick={onClose}>
        <span className="text-black opacity-70 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
          ×
        </span>
      </button>
    </div>
    <div className="p-4 flex flex-col gap-2 ">
      <p className="text-gray-700 mb-4">Title: {eventTitle}</p>
      <div className="flex flex-col gap-2 space-y-2">
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-semibold">Date:</span>
          <span className="text-gray-600 ml-2">{eventDate}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-700 font-semibold">Start Time:</span>
          <span className="text-gray-600 ml-2">{eventStartTime}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-700 font-semibold">End Time:</span>
          <span className="text-gray-600 ml-2">{eventEndTime}</span>
        </div>
      </div>
    </div>
  </div>
</div> 



      )}
    </>
  );
};
export const Day = ({ day, rowIdx, handleDateClick }) => {
  console.log(day,'106');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventId,setEventId]=useState('');
  const [eventTitle,setEventTitle]=useState('');
  const [eventStartTime,setEventStartTime]=useState('');
  const [eventEndTime,setEventEndTime]=useState('');
  const [eventDate,setEventDate]=useState('');
  const openModal = (Event) => {
    setEventId(Event._id)
    setEventTitle(Event.title)
    setEventStartTime(Event.startTime)
    setIsModalOpen(true);
    setEventEndTime(Event.endTime)
    setEventDate(Event.date)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // console.log(day,'5');
  const currentCss = {
    color: "white",
    backgroundColor: "blue",
    borderRadius: "16px",
    padding: "4px",
    width: "32px",
  };
  
  function getCurrentDayClass() {
    const currentDate = dayjs().format('DD');
    const formattedDay = dayjs(day).format('DD');
  
    // return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
   
    // return dayjs().format('DD')===dayjs(day).format('DD')
    return dayjs(day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? currentCss
      : {};
  }
  const dateCss = {
    border: "2px solid #e2e8f0",
    display: "flex",
    padding: "25px",
    size: "large",
    justifyContent: "center",
    alignItems: "center",
  };
  const headerCss = {
    display: "flex",
    padding: "15px",
  };
  const dayCss = {
    marginTop: "0px",
  };
  const events = useSelector(state => state.addEvent.event);
  // console.log(events,'33');
  return (
    <>
      <div className=" border-2  border-gray-200 flex flex-col" style={dateCss}>
        <header className="flex flex-col py-8 items-center" style={headerCss}>
          {rowIdx === 0 && (
            <p className="text-xl " style={dayCss}>
              {/* {day} */}
              {/* {day.format("ddd").toUpperCase()} */}
              {dayjs(day).format("ddd").toUpperCase()}
            </p>
          )}

          <p
            onClick={handleDateClick}
            className={`text-sm p-1 my-1 text-center  `}
            style={getCurrentDayClass()}
          >
            {/* {day} */}
            {dayjs(day).format("DD")}
            {/* {day.format("DD")} */}
          
          </p>
          {events && events.filter((event) =>  event.date ===   dayjs(day).format("DD-MM-YY"))
  .map((event) => (
    <span key={event._id} className="text-black"  onClick={() => openModal(event)}>
      {event.title}
    </span>
  
  ))}
<Modal isOpen={isModalOpen} onClose={closeModal} eventID={eventId} eventDate={eventDate} eventTitle={eventTitle} eventStartTime={eventStartTime} eventEndTime={eventEndTime} />
          {/* <p className="text-black">event</p> */}
        </header>
      </div>
    </>
  );
};


// onClick={deleteEvent(eventID)}   onClick={openModal(event._id)}