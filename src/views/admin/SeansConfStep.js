import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import AddFilmForm from "./AddFilmForm";
import Move from "./Move";
import axios from "axios";
import AddSeansForm from "./AddSeansForm";
import { useStateContext } from "../../contexts/ContentProvider";
import SessionHall from "./SessionHall";
import { BASE_URL } from "../../components/apiConfig";

export default function SeansConfStep() {
  const { halls, sessionsDataCtx, setSessionsDataCtx } = useStateContext();
  const [modalActive, setModalActive] = useState(false);
  const [modalActiveSeans, setModalActiveSeans] = useState(false);
  const [films, setFilms] = useState([]);
  const [filmsData, setFilmsData] = useState({});
  const [sessionsData, setSessionsData] = useState([]);

  //console.log(sessionsData);

  useEffect(() => {
    axios
      .get(`${BASE_URL}api/sessions.php`)
      .then(({ data }) => {
        if (data) {
          let outputArray = [];
          let tempMap = new Map();

          data.forEach((item) => {
            if (tempMap.has(item.hall_id)) {
              // Если объект с hall_id уже существует, добавляем его в соответствующий массив
              outputArray[tempMap.get(item.hall_id)].push(item);
            } else {
              // Если объекта с hall_id ещё нет, создаем новый массив и добавляем в него текущий объект
              tempMap.set(item.hall_id, outputArray.length);
              outputArray.push([item]);
            }
          });

          let outputArrayFixed = outputArray.map((arr, index) => {
            return arr.map((item) => {
              return {
                index: index,
                hall_id: item.hall_id,
                hall_name: item.hall,
                film_title: item.film_title,
                film_id: item.film_id,
                film_time: item.time,
                start_Session: item.session_start,
              };
            });
          });

          setSessionsData(outputArrayFixed);
          setSessionsDataCtx(outputArrayFixed);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const saveSessionsHandler = (e) => {
    e.preventDefault();
    setSessionsDataCtx(sessionsData);
    axios
      .post(`${BASE_URL}api/sessions.php`, sessionsData)
      .then(({ data }) => {
        //console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handl = () => {
    setModalActive(false);
    fetchFilms();
  };

  const removeFilmBlockHandler = (indexFilm, hallindex) => {
    const removeItemByIndex = (arr, arrayIndex, itemIndex) => {
      return arr.map((subArr, i) => {
        if (i === arrayIndex) {
          return subArr.filter((item, j) => j !== itemIndex);
        }
        return subArr;
      });
    };

    const updatedSessionsData = removeItemByIndex(
      sessionsData,
      hallindex,
      indexFilm
    );
    setSessionsData(updatedSessionsData);
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

  const removeFilmHandler = (id) => {
    setFilms((prevFilms) => prevFilms.filter((film) => film.id !== id));
    setModalActiveSeans(false);

    const removeItemById = (arr, id) =>
      arr.filter((item) => item.film_id !== id);
    const updatedSessionsData = sessionsData.map((arr) =>
      removeItemById(arr, id)
    );
    setSessionsData(updatedSessionsData);

    axios
      .delete(`${BASE_URL}api/films.php?id=${id}`)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchFilms = () => {
    axios
      .get(`${BASE_URL}api/films.php`)
      .then(({ data }) => {
        setFilms(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchFilms();
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
              <SessionHall
                removeFilm={removeFilmHandler}
                hallData={sessionsData[index]}
                removeBlock={removeFilmBlockHandler}
              />
            </div>
          ))}
        </div>

        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular">
            Отмена
          </button>
          <input
            type="submit"
            onClick={saveSessionsHandler}
            value="Сохранить"
            className="conf-step__button conf-step__button-accent"
          />
        </fieldset>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <AddFilmForm addHandler={handl} />
      </Modal>
      <Modal active={modalActiveSeans} setActive={setModalActiveSeans}>
        <AddSeansForm
          filmsData={filmsData}
          addHandler={handlSeans}
          removeHandler={removeFilmHandler}
        />
      </Modal>
    </>
  );
}
