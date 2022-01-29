import React from "react";
import axios from "axios";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";
import { getInterviewersForDay } from "helpers/selectors";

import useVisualMode from "hooks/useVisualMode.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR = "ERROR";

export default function Appointment(props) {

  const { interview, time, state, setState, id } = props;

  const { mode, transition, back }  = useVisualMode( 
    interview ? SHOW : EMPTY );

    //logic for saving an interview

    function bookInterview(id, interview) {
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
        transition(SHOW);
      })
      .catch(err => {
        transition(ERROR)
        console.log(err.message)
      }
      )
    };

 
    const save = (name, interviewer) => {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);
      bookInterview(id, interview);
    };

    //logic for deleting an interview

    const cancelInterview = (id) => {

      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({...state, appointments});
      axios.delete(`./api/appointments/${id}`)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => {
        transition(ERROR)
        console.log(err.message)
      }
      )
      
    };

    const cancel = (id) => {
      transition(DELETING);
      cancelInterview(id);
    }

    const confirm = () => {
      transition(CONFIRM);
    }

    const edit = (student, interviewer) => {
      transition(EDIT);
    }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty 
        onAdd={() => transition(CREATE)} 
        /> }
      {mode === SHOW && <Show 
          student={interview.student} 
          interviewer={interview.interviewer.name}
          onDelete={ confirm }
          onEdit={ edit }
          id={ id }
          /> }
      {mode === CREATE && <Form
        interviewers={getInterviewersForDay(state, state.day)}
        onCancel={() => back()}
        onSave = { save }
      /> }
      {mode === EDIT && <Form
        interviewers={getInterviewersForDay(state, state.day)}
        onCancel={() => back()}
        onSave = { save }
        interviewer={ interview.interviewer.id }
        student={ interview.student }
      /> }
      {mode === SAVING && <Status 
        message="Saving"
      />}
      {mode === DELETING && <Status 
        message="Deleting"
      />}
      {mode === CONFIRM && <Confirm 
        message="Are you sure you would like to delete?"
        id={ id }
        onConfirm={ cancel }
        onCancel={() => back() }
        />}
        {mode === ERROR && <Error 
        />}
    </article>
  )
};