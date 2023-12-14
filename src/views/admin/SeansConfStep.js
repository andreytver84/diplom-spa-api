import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import AddFilmForm from "./AddFilmForm";
import Move from "./Move";
import axios from "axios";

export default function SeansConfStep() {
  const [modalActive, setModalActive] = useState(false);
  const [films, setFilms] = useState([]);

  const handl = () => {
    setModalActive(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:80/api/films.php")
      .then(({ data }) => {
        console.log(data);
        setFilms(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <button
            className="conf-step__button conf-step__button-accent"
            onClick={() => setModalActive(true)}
          >
            Добавить фильм
          </button>
        </p>
        <div className="conf-step__movies">
          {films.length < 1
            ? "Нет фильмов"
            : films.map((film, index) => (
                <Move
                  key={film.id + index}
                  id={film.id}
                  title={film.title}
                  time={film.time}
                  image={film.image}
                />
              ))}
        </div>

        <div className="conf-step__seances">
          <div className="conf-step__seances-hall">
            <h3 className="conf-step__seances-title">Зал 1</h3>
            <div className="conf-step__seances-timeline">
              <div
                className="conf-step__seances-movie"
                //style="width: 60px; background-color: rgb(133, 255, 137); left: 0;"
              >
                <p className="conf-step__seances-movie-title">
                  Миссия выполнима
                </p>
                <p className="conf-step__seances-movie-start">00:00</p>
              </div>
              <div
                className="conf-step__seances-movie"
                //style="width: 60px; background-color: rgb(133, 255, 137); left: 360px;"
              >
                <p className="conf-step__seances-movie-title">
                  Миссия выполнима
                </p>
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
            </div>
          </div>
          <div className="conf-step__seances-hall">
            <h3 className="conf-step__seances-title">Зал 2</h3>
            <div className="conf-step__seances-timeline">
              <div
                className="conf-step__seances-movie"
                //style="width: 65px; background-color: rgb(202, 255, 133); left: 595px;"
              >
                <p className="conf-step__seances-movie-title">
                  Звёздные войны XXIII: Атака клонированных клонов
                </p>
                <p className="conf-step__seances-movie-start">19:50</p>
              </div>
              <div
                className="conf-step__seances-movie"
                //style="width: 60px; background-color: rgb(133, 255, 137); left: 660px;"
              >
                <p className="conf-step__seances-movie-title">
                  Миссия выполнима
                </p>
                <p className="conf-step__seances-movie-start">22:00</p>
              </div>
            </div>
          </div>
        </div>

        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular">
            Отмена
          </button>
          <input
            type="submit"
            defaultValue="Сохранить"
            className="conf-step__button conf-step__button-accent"
          />
        </fieldset>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <AddFilmForm addHandler={handl} />
      </Modal>
    </>
  );
}
