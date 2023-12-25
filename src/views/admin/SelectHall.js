import React, { useState } from "react";
import InputHall from "./InputHall";
import { useStateContext } from "../../contexts/ContentProvider";

export default function SelectHall({ ChangeHandler }) {
  const { halls } = useStateContext();

  return (
    <div>
      <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
      <ul className="conf-step__selectors-box">
        {halls.length < 1
          ? "Нет залов"
          : halls.map((hall, index) => (
              <li key={hall.id + index}>
                <InputHall
                  index={index}
                  name={hall.name}
                  id={hall.id}
                  onChange={ChangeHandler}
                />
                <span className="conf-step__selector">{hall.name}</span>
              </li>
            ))}
      </ul>
    </div>
  );
}
