import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import AddFilmForm from "./AddFilmForm";
import Move from "./Move";
import axios from "axios";
import AddSeansForm from "./AddSeansForm";
import { useStateContext } from "../../contexts/ContentProvider";
import SessionHall from "./SessionHall";

export default function SeansConfStep() {
  const { halls } = useStateContext();
  const [modalActive, setModalActive] = useState(false);
  const [modalActiveSeans, setModalActiveSeans] = useState(false);
  const [films, setFilms] = useState([]);
  const [filmsData, setFilmsData] = useState({});
  const [sessionsData, setSessionsData] = useState([]);

  const handl = () => {
    setModalActive(false);
  };

  const handlSeans = (newData) => {
    setModalActiveSeans(false);
    //console.log(newData);
    setSessionsData((prevData) => {
      const updatedData = [...prevData];
      if (Array.isArray(updatedData[newData.index])) {
        updatedData[newData.index] = [...updatedData[newData.index], newData];
      } else {
        updatedData[newData.index] = [newData];
      }
      return updatedData;
    });
  };

  //console.log(sessionsData ? sessionsData : "no sessions");

  const clickMoveHandler = (id, title, time) => {
    setModalActiveSeans(true);
    setFilmsData({
      id,
      title,
      time,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:80/api/films.php")
      .then(({ data }) => {
        //console.log(data);
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
                  clickMove={clickMoveHandler}
                  key={film.id + index}
                  id={film.id}
                  title={film.title}
                  time={film.time}
                  image={film.image}
                />
              ))}
        </div>

        <div className="conf-step__seances">
          {halls.map((hall, index) => (
            <div key={index + hall.name} className="conf-step__seances-hall">
              <h3 className="conf-step__seances-title">{hall.name}</h3>
              <SessionHall hallData={sessionsData[index]} />
            </div>
          ))}
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
      <Modal active={modalActiveSeans} setActive={setModalActiveSeans}>
        <AddSeansForm filmsData={filmsData} addHandler={handlSeans} />
      </Modal>
    </>
  );
}
