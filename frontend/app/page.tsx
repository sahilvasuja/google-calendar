"use client";
import Navbar from "@/app/Navbar/page";
import React from "react";
import Image from "next/image";
import calendar from '../public/calendar.png'

export default function Home() {
  const homeHead = {
    color: "#007bff",
    fontSize: "50px",
    fontWeight: "800"
}
  return ( 
    <div className="bg-gray-300 h-screen">
      <Navbar />
         <div>
                <div className="pb-5">
                    <div className="container-fluid pt-5 ">
                        <div className="text-center">
                            <h2 style={homeHead}>Manage your Calendar</h2>
                            <Image src={calendar} width={700} height={560} alt='Calendar' className=" mx-auto mt-5 mb-5 img-fluid d-block" />
                            {/* <img src={require('../images/calendar.png')}  alt="" /> */}
                        </div>
                    </div>
                </div>
            </div>
           
    </div>
    //  <p className='bg-red-500'>hlo</p>
  );
}
