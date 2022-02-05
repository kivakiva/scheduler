import React, { useState } from "react";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";

export default function Form(props) {
  const { interviewers, onCancel, onSave } = props;

  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [student, setStudent] = useState(props.student || "");
  const [error, setError] = useState("");

  const reset = () => {
    setInterviewer("");
    setStudent("");
    setError("");
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewer}
          interviewers={interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => {
              return validate();
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
