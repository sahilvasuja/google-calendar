"use client";
import Navbar from "@/app/Navbar/page";
import React from "react";
import Image from "next/image";
import calendar from "../public/calendar.png";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import { useAuth0 } from "@auth0/auth0-react";
export default function Home() {
  const homeHead = {
    color: "#007bff",
    fontSize: "50px",
    fontWeight: "800",
  };
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();
  function showToast(message:String) {
    toast.error(message);
  }
  
  const handleLogin = () => {
    // Perform login logic
    // ...

    // Show toast message
    showToast('Login required');
  };
  return (
    <div className="bg-gray-300 h-screen">
      <Navbar />
      <div>
        <div className="pb-5">
          <div className="container-fluid pt-5 ">
            <div className="text-center">
              <h2 style={homeHead}>Manage your Calendar</h2>
              {
                isAuthenticated ? 
                <Link href="/Calendar">
                <Image
                  src={calendar}
                  width={700}
                  height={560}
                  alt="Calendar"
                  className=" mx-auto mt-5 mb-5 img-fluid d-block"
                />
              </Link> :  
              <>
                  <Image
                    src={calendar}
                    onClick={handleLogin}
                    width={700}
                    height={560}
                    alt="Calendar"
                    className=" mx-auto mt-5 mb-5 img-fluid d-block"
                  />
                 
              </>
              }
          
             
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
