import React, { useEffect, useRef, useState } from "react";

export default function FilmBlock({ filmData }) {
  const withBlock = +filmData.film_time / (1440 / 100) + "%";

  const time = filmData.start_Session;
  const timeParts = time.split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const totalMinutes = hours * 60 + minutes;
  const leftOffset = (totalMinutes / 1440) * 0.5 * 1440;

  const colorNumb = filmData.film_id;
  return (
    <div
      className="conf-step__seances-movie"
      style={{
        width: withBlock,
        backgroundColor: `rgb(1${colorNumb}3, 2${colorNumb}5, 1${colorNumb}7)`,
        left: `${leftOffset}px`,
      }}
    >
      <p className="conf-step__seances-movie-title">{filmData.film_title}</p>
      <p className="conf-step__seances-movie-start">{filmData.start_Session}</p>
    </div>
  );
}
