import React, { useEffect, useState } from "react";

export default function InputHall(props) {
  //const [isChecked, SetIsChecked] = useState(false);
  const changeHandler = () => {
    props.onChange(props.id, props.name);
  };
  /*   let isChecked = false;
  if (props.index == 0) {
    isChecked = true;
  } */

  //console.log(props.isChecked);

  return (
    <input
      type="radio"
      className="conf-step__radio"
      data-index={props.index}
      name="chairs-hall"
      value={props.name}
      defaultChecked={props.isChecked}
      onChange={changeHandler}
    />
  );
}
