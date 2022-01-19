import React, { useState } from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const { name, id, avatar, selected, setInterviewer } = props;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  const interviewerImageClass = `${interviewerClass} ${interviewerClass}-image`;

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
  <img
    className={interviewerImageClass}
    src={avatar}
    alt={name}
  />
  {name}
</li>

  )
}

