import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (prop) {
  
  const { days, onChange, value } = prop;


  const parsedDays = days.map(day => {
    return (
      <DayListItem key={day.id} {...day} value={value} setDay={onChange} selected={day.name===value} />)
  })
  

  return (
    <ul>
      {parsedDays}
    </ul>
  )
}