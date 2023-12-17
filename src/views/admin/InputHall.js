import React, { useEffect, useState } from "react";

export default function InputHall(props) {
  const changeHandler = () => {
    props.onChange(props.id, props.name, props.index);
  };

  const onClickHandler = () => {
    props.onClick();
  };

  return (
    <input
      type="radio"
      className="conf-step__radio"
      name="chairs-hall"
      value={props.name}
      onChange={changeHandler}
      defaultChecked={props.isChecked}
      onClick={onClickHandler}
    />
  );
}
