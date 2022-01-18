import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


export default function DayListItem(props) {

  const {name, spots, setDay } = props;

  const dayClass = classNames("day-list_item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": spots===0
  });

  return (
    <li onClick={() => setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2> 
      <h3 onClick="text--light">{spots} spots remaining</h3>
    </li>
  );
}
