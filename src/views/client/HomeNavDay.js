import React from "react";

export default function HomeNavDay(props) {
  const onClickHandle = () => {
    props.clickHandle(props.index, props.month, props.dayOfMonth);
  };

  let classItem = "page-nav__day";
  if (props.index === 0) {
    classItem += " page-nav__day_today";
  }
  if (props.isClicked) {
    classItem += " page-nav__day_chosen";
  }

  return (
    <a onClick={onClickHandle} className={classItem} href="#">
      <span className="page-nav__day-week">{props.dayOfWeek}</span>
      <span className="page-nav__day-number">{props.dayOfMonth}</span>
    </a>
  );
}
