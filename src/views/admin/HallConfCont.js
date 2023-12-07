import React, { useRef } from "react";

export default function HallConfCont() {
  const refButton = useRef([]);

  return (
    <div>
      <ul className="conf-step__list">
        <li>
          Зал 1
          <button
            ref={refButton}
            className="conf-step__button conf-step__button-trash"
          ></button>
        </li>
        <li>
          Зал 2
          <button className="conf-step__button conf-step__button-trash"></button>
        </li>
      </ul>
      <button className="conf-step__button conf-step__button-accent">
        Создать зал
      </button>
    </div>
  );
}
