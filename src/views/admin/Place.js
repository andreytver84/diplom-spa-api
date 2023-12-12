import React, { useState } from "react";

export default function Place(props) {
  const [chairType, setChairType] = useState("conf-step__chair_standart");

  const handleClickChair = () => {
    let updatedChairType;
    if (chairType === "conf-step__chair_standart") {
      updatedChairType = "conf-step__chair_vip";
    } else if (chairType === "conf-step__chair_vip") {
      updatedChairType = "conf-step__chair_disabled";
    } else {
      updatedChairType = "conf-step__chair_standart";
    }
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
