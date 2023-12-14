import React from "react";

export default function Move({ id, title, time, image }) {
  const imgsrc = "http://localhost:80/api/" + image;
  return (
    <div className="conf-step__movie" data-id={id}>
      <img className="conf-step__movie-poster" alt="poster" src={imgsrc} />
      <h3 className="conf-step__movie-title">{title}</h3>
      <p className="conf-step__movie-duration">{time} минут</p>
    </div>
  );
}
