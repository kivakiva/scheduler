import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import InterviewerList from "components/InterviewerList.js";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get("./api/days"),
      axios.get("./api/appointments"),
      axios.get("./api/interviewers")
    ]).then((all) => {

      const [days, appointments, interviewers] = all;

      
      setState(prev => ({...prev, days: days.data, appointments : appointments.data, interviewers : interviewers.data}))
    }) 
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day);  

  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList 
  days={state.days} 
  value={state.day} 
  onChange={setState}
  state={state}
  />
<InterviewerList interviewers={interviewers} onChange={setState} state={state} value={state.interviewer} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
        </section>
      <section className="schedule">
        <h3> appointments </h3>
        {dailyAppointments.map((appointment) =>{
          const interview = getInterview(state, appointment.interview);

          return (
            <Appointment key={appointment.id} {...appointment} state={state} setState={setState} interview={interview} />)
        }).concat([<Appointment key="last" time="5pm" />])
        }
      </section>
    </main>
  );
}
