import React, { useState } from "react"

export default function InterviewerListItem(props) {

  const { name, id, avatar, selected, setInterviewer } = props;

  return (
    <h3>{name}</h3>
  )
}

