import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import { getInterviewersForDay } from "helpers/selectors";

import useVisualMode from "hooks/useVisualMode.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { interview, time, state } = props;

  const { mode, transition, back }  = useVisualMode( 
    interview ? SHOW : EMPTY );

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={interview.student} 
          interviewer={interview.interviewer.name} 
          />
          )}
      {mode === CREATE && <Form
        interviewers={getInterviewersForDay(state, state.day)}
        onCancel={() => back()}
      /> }
    </article>
  )
};