import React, { useEffect, useRef, useState } from "react";
import FilmBlock from "./FilmBlock";

export default function SessionHall({ hallData }) {
  console.log(hallData);
  return (
    <div className="conf-step__seances-timeline">
      {hallData
        ? hallData.map((film, index) => (
            <FilmBlock filmData={hallData[index]} key={index} />
          ))
        : " "}
    </div>
  );
}

{
  /* <div className="conf-step__seances-timeline">
  <div
    className="conf-step__seances-movie"
    //style="width: 60px; background-color: rgb(133, 255, 137); left: 0;"
  >
    <p className="conf-step__seances-movie-title">Миссия выполнима</p>
    <p className="conf-step__seances-movie-start">00:00</p>
  </div>
  <div
    className="conf-step__seances-movie"
    //style="width: 60px; background-color: rgb(133, 255, 137); left: 360px;"
  >
    <p className="conf-step__seances-movie-title">Миссия выполнима</p>
    <p className="conf-step__seances-movie-start">12:00</p>
  </div>
  <div
    className="conf-step__seances-movie"
    //style="width: 65px; background-color: rgb(202, 255, 133); left: 420px;"
  >
    <p className="conf-step__seances-movie-title">
      Звёздные войны XXIII: Атака клонированных клонов
    </p>
    <p className="conf-step__seances-movie-start">14:00</p>
  </div>
</div>; */
}
