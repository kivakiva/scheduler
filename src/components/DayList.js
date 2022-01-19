import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (prop) {
  
  const {days, setDay} = prop;

  const parsedDays = days.map(day => <DayListItem {...day} />)

  return (
    <ul>
      {parsedDays}
    </ul>
  )
}