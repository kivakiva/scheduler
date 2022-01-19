import React, { useState } from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const { name, id, avatar, selected, setInterviewer } = props;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  // const interviewerImageClass = `interviewers__item-image`;

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {selected && name}
</li>

  )
}

