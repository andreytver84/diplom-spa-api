import React from "react";
import { BASE_URL } from "../../components/apiConfig";

export default function Move({ clickMove, id, title, time, image }) {
  const imgsrc = `${BASE_URL}api/` + image;

  const onClickHandler = () => {
    clickMove(id, title, time);
  };

  return (
    <div onClick={onClickHandler} className="conf-step__movie" data-id={id}>
      <img className="conf-step__movie-poster" alt="poster" src={imgsrc} />
      <h3 className="conf-step__movie-title">{title}</h3>
      <p className="conf-step__movie-duration">{time} минут</p>
    </div>
  );
}
