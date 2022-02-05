import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  const { confirm, danger, disabled, onClick, children } = props;

  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger,
  });

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
