import React, { useState } from "react";

export default function PlaceHall(props) {
  const [chairType, setChairType] = useState("buying-scheme__chair_standart");

  const handleClickChair = () => {
    let updatedChairType;
    if (props.classes.includes("buying-scheme__chair_taken")) {
      return;
    }
    updatedChairType = "buying-scheme__chair_selected";
    setChairType(updatedChairType);
    props.onClick(props.row, props.place, updatedChairType);
  };
  return (
    <span
      onClick={handleClickChair}
      className={`${props.classes} ${chairType}`}
    ></span>
  );
}
