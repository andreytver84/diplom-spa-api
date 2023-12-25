import React, { useEffect, useState } from "react";

export default function InputHall(props) {
  const changeHandler = () => {
    props.onChange(props.id, props.name, props.index);
  };

  return (
    <input
      type="radio"
      className="conf-step__radio"
      name="chairs-hall"
      value={props.name}
      defaultChecked={props.isChecked}
      onClick={changeHandler}
    />
  );
}
