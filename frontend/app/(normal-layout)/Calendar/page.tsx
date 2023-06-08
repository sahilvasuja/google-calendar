'use client';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getMonth } from '@/utils/helper';
import Month from '@/Component/Month';
import { Sidebar } from '@/Component/Sidebar';
import { CalendarHeader } from '@/Component/CalendarHeader/page';
import { useAppSelector } from '@/app/redux/store';


// export function Example(){
//   const toastId = React.useRef(null);

//   const notify = () => toastId.current = toast("Lorem ipsum dolor");

//   const dismiss = () =>  toast.dismiss(toastId.current);

//   const dismissAll = () =>  toast.dismiss();

//   return (
//     <div>
//       <button onClick={notify}>Notify</button>
//       <button onClick={dismiss}>Dismiss</button>
//       <button onClick={dismissAll}>Dismiss All</button>
//     </div>
//   );
// }
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function Example() {
  const notify = () => {
    toast("Default Notification !");

    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    });

    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_LEFT
    });

    toast.warn("Warning Notification !", {
      position: toast.POSITION.BOTTOM_LEFT
    });

    toast.info("Info Notification !", {
      position: toast.POSITION.BOTTOM_CENTER
    });

    toast("Custom Style Notification with css class!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'foo-bar'
    });
  };

   return (
      <>
        <button onClick={notify}>Notify</button>;
        <ToastContainer />
      </>
    );
}
const Calendar = () => {
  // const [currentMonth,setCurrentMonth]=useState(getMonth())
  const {daysMatrix} = useAppSelector((state) => state.monthIndex);
  // console.log(currentMonth,'11');


  return (
    <>
      <div className='flex flex-col w-full items-center'>
        {/* <CalendarHeader /> */}
        <div className='flex flex-1'>
         
          <div className=''> 

          <Month month={daysMatrix} />
          </div>
        </div>
      </div>
      
      </>
 
 );
};

              // console.log(userdata)
 
export default Calendar;