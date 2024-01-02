import React, { useEffect, useState } from "react";

export default function MovieSession(props) {
  const time = props.start.slice(0, 5);
  return (
    <li className="movie-seances__time-block">
      <a id={props.id} className="movie-seances__time" href="hall.html">
        {time}
      </a>
    </li>
  );
}
