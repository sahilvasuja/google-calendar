import React from 'react'
import dayjs from "dayjs";
export const Day = ({day,rowIdx}) => {
  const currentCss={
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: '4px'
  }
    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
         
      }
      const dateCss={
        border: '2px solid #e2e8f0',
        display: 'flex',
      }
      const headerCss={
        display: 'flex',
        
      }
  return (
    <div className=' border-2  border-gray-200 flex flex-col'  style={dateCss}>
          <header className="flex flex-col items-center" style={headerCss}>
        
          {rowIdx === 0 && (
          <p className="text-xl mt-1 ">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
   
        <p
          className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()} `} style={currentCss}
        >
          {day.format("DD")}
        </p>
      </header>
       
    </div>
  )
}
