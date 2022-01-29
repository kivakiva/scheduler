import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  const { onChange, value, interviewers, state } = props;

  const parsedInterviewers = interviewers.map((interviewerData) => <InterviewerListItem {...interviewerData} state={state} key={interviewerData.id} setInterviewer={() => onChange(interviewerData.id)} selected={value === interviewerData.id} />)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>

  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

