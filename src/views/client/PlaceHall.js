import React, { useState } from "react";

export default function PlaceHall(props) {
  const [chairType, setChairType] = useState("buying-scheme__chair_standart");
  const [checked, setChecked] = useState(false);

  const handleClickChair = () => {
    let updatedChairType = !checked
      ? "buying-scheme__chair_selected"
      : "buying-scheme__chair_standart";

    if (props.classes.includes("buying-scheme__chair_vip")) {
      setChairType("buying-scheme__chair_vip");
    }

    if (props.classes.includes("buying-scheme__chair_taken")) {
      return;
    }

    setChecked(!checked);
    setChairType(updatedChairType);

    props.onClick(props.row, props.place, updatedChairType, props.classes);
  };

  return (
    <span
      onClick={handleClickChair}
      className={`${props.classes} ${chairType}`}
    ></span>
  );
}
