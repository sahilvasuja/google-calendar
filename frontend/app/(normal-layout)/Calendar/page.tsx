'use client';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useState } from 'react';
import { getMonth } from '@/utils/helper';
import Month from '@/Component/Month';
import { Sidebar } from '@/Component/Sidebar';
import { CalendarHeader } from '@/Component/CalendarHeader/page';
const Calendar = () => {
  const [currentMonth,setCurrentMonth]=useState(getMonth())
  // const [userdata,setUserdata]=useState([])
  //  const { user, isAuthenticated, isLoading,getAccessTokenSilently,loginWithRedirect,logout} = useAuth0();
  //   const callApi=async()=>{
  //     try {
  //       const token =await getAccessTokenSilently()
  //       console.log(token)
  //       const response=await axios.get('http://localhost:4000/', {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })
  //       console.log(response.data,"28");
  //       setUserdata(response.data)
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //     }
  //     console.log(userdata)
      console.table(getMonth(3));
    return (
      <>
      <div className='flex flex-col'>
        <CalendarHeader />
        <div className='flex flex-1'>
        <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    {/* <li className=''>
    <button onClick={callApi}>backend</button>
  </li> */}
  {/* {
    userdata && 
    <div>
      <p>{userdata.name}</p>
    </div>
  } */}
      </>
 
  );
};
export default Calendar;
