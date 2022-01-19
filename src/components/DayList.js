import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (prop) {
  
  const { days, setDay } = prop;

  // console.log(setDay);

  const parsedDays = days.map(day => <DayListItem key={day.id} {...day} setDay={setDay} />)

  return (
    <ul>
      {parsedDays}
    </ul>
  )
}