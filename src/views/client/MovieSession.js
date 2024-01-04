import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContentProvider";

export default function MovieSession(props) {
  const { setMovieSession } = useStateContext();
  const time = props.start.slice(0, 5);
  const clickHandler = () => {
    const findSession = props.data.find(
      (session) => session.session_id === props.id
    );

    setMovieSession(findSession);
  };
  return (
    <li className="movie-seances__time-block">
      <Link
        onClick={clickHandler}
        className="movie-seances__time"
        to={`/hall/${props.id}`}
      >
        {time}
      </Link>
    </li>
  );
}
