import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList(props) {

  const {setInterviewer, interviewer, interviewers} = props;
  
  const parsedInterviewers = interviewers.map((interviewerData) => <InterviewerListItem {...interviewerData} key={interviewerData.id} setInterviewer={() => setInterviewer(interviewerData.id)} selected={interviewer===interviewerData.id} />)

  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{parsedInterviewers}</ul>
</section>

  )
}

