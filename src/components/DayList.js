import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (prop) {
  
  const { days, onChange, value, state } = prop;


  const parsedDays = days.map(day => {
    return (
      <DayListItem key={day.id} {...day} value={value} state={state} setDay={onChange} selected={day.name===value} />)
  })
  

  return (
    <ul>
      {parsedDays}
    </ul>
  )
}