import React, { useState } from "react";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  const mockInterviewers = [
    {name: "Abraham",
  id:1},
    {name: "johnny",
  id:2},
    {name: "bella",
  id:3}
  
  ]

  const [interviewer, setInterviewer] = useState("no interviewer")

  const interviewers = mockInterviewers.map((interviewerData) => <InterviewerListItem {...interviewerData} key={interviewer.id} interviewer={interviewer} setInterviewer={setInterviewer}/>)

  return (
    <ul>
      {interviewers}
    </ul>
  )
}

