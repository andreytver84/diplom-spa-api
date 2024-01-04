import React from "react";
import { useStateContext } from "../../contexts/ContentProvider";
import PlaceHall from "./PlaceHall";

export default function Hall() {
  const { movieSession, setMovieSession } = useStateContext();

  if (movieSession.conf) {
    localStorage.setItem("dataConf", movieSession.conf);
    localStorage.setItem("dataTime", movieSession.start_Session.slice(0, 5));
    localStorage.setItem("dataHall", movieSession.hall_name);
    localStorage.setItem("dataFilm", movieSession.film_title);
  }

  let conf = JSON.parse(
    JSON.parse(JSON.parse(localStorage.getItem("dataConf")))
  );

  //conf = JSON.parse(JSON.parse(JSON.parse(movieSession.conf)));
  //console.log(conf);

  const time = localStorage.getItem("dataTime");

  const changeClassHandler = (row, place, classes) => {
    console.log(row + " " + place + " " + classes);
  };

  return (
    <main>
      <section className="buying">
        <div className="buying__info">
          <div className="buying__info-description">
            <h2 className="buying__info-title">
              {localStorage.getItem("dataFilm")}
            </h2>
            <p className="buying__info-start">Начало сеанса: {time}</p>
            <p className="buying__info-hall">
              {localStorage.getItem("dataHall")}
            </p>
          </div>
          <div className="buying__info-hint">
            <p>
              Тапните дважды,
              <br />
              чтобы увеличить
            </p>
          </div>
        </div>
        <div className="buying-scheme">
          <div className="buying-scheme__wrapper">
            {conf.map((row, i) => (
              <div key={i} className="buying-scheme__row">
                {row.map((place, j) => (
                  <PlaceHall
                    onClick={changeClassHandler}
                    row={i}
                    place={j}
                    key={place.key}
                    classes={place.classes}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="buying-scheme__legend">
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>{" "}
                Свободно (
                <span className="buying-scheme__legend-value">250</span>руб)
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>{" "}
                Свободно VIP (
                <span className="buying-scheme__legend-value">350</span>руб)
              </p>
            </div>
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>{" "}
                Занято
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_selected"></span>{" "}
                Выбрано
              </p>
            </div>
          </div>
        </div>
        <button
          className="acceptin-button"
          /*  onclick="location.href='payment.html'" */
        >
          Забронировать
        </button>
      </section>
    </main>
  );
}
