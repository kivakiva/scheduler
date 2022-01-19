import React, { useState } from "react";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  const mockInterviewers = [
    {name: "Abraham"},
    {name: "johnny"},
    {name: "bella"}
  
  ]

  const interviewers = mockInterviewers.map((interviewer) => <InterviewerListItem {...interviewer} />)

  return (
    <ul>
      {interviewers}
    </ul>
  )
}

