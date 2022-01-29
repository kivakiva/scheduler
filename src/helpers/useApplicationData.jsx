import axios from "axios";
import {useEffect, useState} from "react";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = (name) => {
    setState(prev => ({...prev, day: name}));
  }

  const updateSpots = () => {
    console.log("updating spots");
    setState((prev) => {
      if (prev.days.length === 0) {return}
      const appointmentIdsForDay = prev.days.reduce((previous, day) => {
        if (day.name === prev.day) {
          return day.appointments
        }
        return previous
      }, "no match found")
  
      let spots = 0
      for (const [key, value] of Object.entries(prev.appointments)) {
        if (!value.interview && appointmentIdsForDay.includes(Number(key))) {
          spots ++
        }
      }
      const newDays = prev.days.map((day) => {
        if (day.name === prev.day) {
          day.spots = spots;
        }
        return day
      })
      return ({...prev, days: [...newDays]})
    
    })
  }




  function bookInterview(id, interview, transition, SHOW, ERROR_SAVE) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.put(`./api/appointments/${id}`, appointment)
    .then(() => {
      setState({...state, appointments});
      updateSpots()
      transition(SHOW);
    })
    .catch(err => {
      transition(ERROR_SAVE, true)
      console.log(err.message)
    })
  };

  const cancelInterview = (id, transition, EMPTY, ERROR_DELETE) => {

    axios.delete(`./api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({...state, appointments});
      updateSpots()
      transition(EMPTY);
    })
    .catch(err => {
      transition(ERROR_DELETE, true)
      console.log(err.message)
    }
    )
    
  };

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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}

export default useApplicationData;