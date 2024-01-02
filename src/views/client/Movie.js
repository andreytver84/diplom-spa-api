import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../components/apiConfig";
import MovieSession from "./MovieSession";

export default function Movie(props) {
  const imgsrc = `${BASE_URL}api/` + props.image;

  //console.log(props.data);

  return (
    <section className="movie">
      <div className="movie__info">
        <div className="movie__poster">
          <img className="movie__poster-image" alt={props.title} src={imgsrc} />
        </div>
        <div className="movie__description">
          <h2 className="movie__title">{props.title}</h2>
          <p className="movie__synopsis">{props.description}</p>
          <p className="movie__data">
            <span className="movie__data-duration">{props.time} мин.</span>
            <br />
            <span className="movie__data-origin"> США</span>
          </p>
        </div>
      </div>

      {props.halls.map((hall) => (
        <div key={hall.name} className="movie-seances__hall">
          <h3 className="movie-seances__hall-title">{hall.name}</h3>
          <ul className="movie-seances__list">
            {props.data
              .filter((session) => session.hall_id == hall.id)
              .sort((a, b) => a.start_Session.localeCompare(b.start_Session))
              .map((item) => (
                <MovieSession
                  key={item.session_id}
                  start={item.start_Session}
                  id={item.session_id}
                />
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
