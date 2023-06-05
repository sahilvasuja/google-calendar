import React from "react";
import { Day } from "../Day";

export default function Month({ month }: any) {
  const monthCss={
   
      display: 'grid',
      gridTemplateColumns:' repeat(7, 1fr)',
      color: '#000000'

    
  }
  return (
    <div style={monthCss} >
      {month.map((row: any[], i: any) => {
        console.log(row, ":row");
        return  row.map((day: any, idx: React.Key | null | undefined) => (
          <Day day={day} key={idx} rowIdx={i} />
        ))
             
        
})}
    </div>

  );
}
