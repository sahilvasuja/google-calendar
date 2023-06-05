'use client';
import Image from 'next/image';
interface NavbarProps {
 
}
import Link from 'next/link';
import {GoogleLogin} from 'react-google-login';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const Dropdown = ({ name, email }) => {
  return ( 
    <div className="absolute top-12 right-0 bg-gray-100 h-[7rem] mr-3 rounded shadow-md px-4 py-2">

      <p className='text-lg text-gray-600'>Google Account</p>
      <p className="text-gray-600 pt-1">{name}</p>
      <p className="text-gray-600">{email}</p>
     
      </div>
   
  );
};

const DropDown = ({ name, email,pic,logout,}) => {
  return (
    <div   className="absolute top-12 right-0 rounded-xl border-sky-200 border-4 w-80 bg-white mr-3 shadow-md px-4 py-2">
      <div className='flex gap-2 '>
        <Image src={pic} alt={''} width={44} height={24} className='rounded-full ' />
        <div className='flex flex-col'>
          <p className="text-gray-600 pt-1">{name}</p>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
      <button className="text-gray-600 pl-12" onClick={() => logout()}>Sign Out</button>
      </div>

  );
};
const Navbar = ({}: NavbarProps) => {
  
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [pic,setPic]=useState('');
  console.log(email,'16');
  const { user, isAuthenticated, isLoading,getAccessTokenSilently, loginWithRedirect,logout} = useAuth0();
  const [showDropdown, setShowDropdown] = useState(false);
  const [onclickDrowdown,setOnclickDropdown]=useState(false)
  const handleLogout = () => {

    logout('http://localhost:3000/')
      .catch((error: any) => {
        console.log('Error occurred during logout:', error);
        // Handle the error here (e.g., show an error message, perform fallback actions)
      });
  };

  const handleDropdown=()=>{
    setOnclickDropdown(true)
  }
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };
  
  // const responseGoogle=(response: any)=>{
    //   console.log(response);
    // }
    // const responseError=(error: any)=>{
      //   console.log(error)
      // }
      useEffect(() => {
        callProtectedApi()
      }, [isAuthenticated])
      const callApi=async()=>{
    try{
     const res=await axios.get('http://localhost:4000/unauthorized')
        console.log(res.data);
      
    }
    catch(error){
        console.log(error.message);
       }
  }
  const callProtectedApi2=async()=>{
    try {
      const token =await getAccessTokenSilently()
      console.log(token)
      const response=await axios.get('http://localhost:4000/Secured', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data,"28");
          
    } catch (error) {
      console.log(error.message)
    }
  }
   const callProtectedApi=async()=>{
     try {
      const token =await getAccessTokenSilently()
      console.log(token)
      const response=await axios.get('http://localhost:4000/authorized', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data,"28");
      setEmail(response.data.email)
      setPic(response.data.picture)
      setName(response.data.name)
    } catch (error) {
      console.log(error.message,'107')
    }
    
    }
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (

    <nav className="flex flex-col bg-white sm:flex-row  md:h-fit   bg-transparent pl-0 ">
      <div className="flex flex-row  text-gray-400 items-center h-[3.4rem] w-full md:h-[5.6rem] justify-between">
        <div className='p-2 text-xl'>
          Google Workspace
        </div>
        {
          isAuthenticated ? (
           
         pic && <div className="relative">
          <div
            className="relative pr-3"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleDropdown}
          >
            <Image src={pic} alt="" className="rounded-full" width={44} height={44} />
          </div>
          {
            onclickDrowdown && <DropDown name={name} email={email} pic={pic} logout={handleLogout}  />
          }
          {showDropdown && <Dropdown name={name} email={email} />}
        </div>
          //  <button className='bg-red-400 p-3 rounded-lg text-black' onClick={() => logout({ logoutParams: { returnTo: 'http://localhost:3000/' } })}>Log Out</button>  
          ) : (
            <button className=' p-3 rounded-lg hover:bg-gray-300 text-sky-600 text-md' onClick={() => loginWithRedirect()}>Sign in</button>
            )
          }
         {/* {
          isAuthenticated && 
          <div>{JSON.stringify(user)}</div>
         } */}
          {/* <GoogleLogin 
      clientId='517962767136-o9nphoso0b4t6ls41hvmf15na3o6anth.apps.googleusercontent.com'
      buttonText='SignIn & Authorize Calendar'
      onSuccess={responseGoogle}
      onFailure={responseError}
      cookiePolicy={'single_host_policy'}
      responseType='code'
      accessType='offline'
      scope='openid email profile https://www.googleapis.com/auth/calendar'
      /> */}
        {/* <div className="flex items-center md:ml-4">
         (
            <div className=" hidden sm:flex relative text-grey h-16 w-[201px] lg:mr-6 focus-within:text-gray-400">
              <button
                className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 px-2 py-2 text-gray-500 hover:text-primaryColor focus:outline-none"
               
              >SignIn
              </button>
            </div>
          )
        </div> */}
        
      </div>
     <div className='flex flex-col text-black'>

    {/* <button onClick={callApi}>unprotected</button>
    <button onClick={callProtectedApi2}>protected</button>
    <button onClick={callProtectedApi}>userdata</button>
   */}
     </div>
  
    </nav>





  
  );
};
export default Navbar;
