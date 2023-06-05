'use client'

import React from 'react';
import '../globals.css';
import Navbar from '../Navbar/page';
export default function PrivateRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

  <div className="flex flex-row h-screen bg-gray-300">
  {/* <Sidebar data={FILTERED_SIDERBAR_DATA} /> */}
  <div className=" h-full z-1 flex flex-col w-full ">
    <Navbar />

    <main className="bg-backgroundColor flex flex-col flex-1 overflow-auto mt-4">
      {children}
    </main>
  </div>
</div>
  );
}

