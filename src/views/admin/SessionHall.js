import React, { useEffect, useRef, useState } from "react";
import FilmBlock from "./FilmBlock";

export default function SessionHall({ hallData, removeBlock }) {
  //console.log(hallData);
  const clickFilmBlock = (indexFilm, hallindex) => {
    removeBlock(indexFilm, hallindex);
  };

  return (
    <div className="conf-step__seances-timeline">
      {hallData
        ? hallData.map((film, index) => (
            <FilmBlock
              indexFilm={index}
              clickHandler={clickFilmBlock}
              filmData={hallData[index]}
              key={index}
            />
          ))
        : " "}
    </div>
  );
}
