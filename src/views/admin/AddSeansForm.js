import React, { useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContentProvider";
import InputHall from "./InputHall";

export default function AddSeansForm({ addHandler, filmsData, removeHandler }) {
  const { halls } = useStateContext();
  const [hallid, setHallid] = useState(1);
  const [hallname, setHallname] = useState("Зал 1");
  const [message, setMessage] = useState();
  const [startSession, setStartSession] = useState();
  const [index, setIndex] = useState(0);
  const startRef = useRef();

  const changeHallHandler = (id, name, index) => {
    //setHallid(event.target.getAttribute("data-id"));
    setHallid(id);
    setHallname(name);
    setIndex(index);
  };

  //console.log(filmsData);

  const startHandleChange = (e) => {
    setStartSession(startRef.current.value);
  };

  const onRemoveHandler = (e) => {
    e.preventDefault();
    setMessage("Фильм удалён");
    setTimeout(() => {
      removeHandler(filmsData.id);
      setMessage();
    }, 1000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("Добавлен");
    setTimeout(() => {
      addHandler({
        index: index,
        hall_id: hallid,
        hall_name: hallname,
        film_title: filmsData.title,
        film_id: filmsData.id,
        film_time: filmsData.time,
        start_Session: startSession,
      });
      setIndex(0);
      setHallid(1);
      setHallname("Зал 1");
      setMessage();
      //startRef.current.value = "";
    }, 1000);
  };

  return (
    <div>
      {!message ? (
        <form onSubmit={submitHandler}>
          <h2>Добавить новый сеанс</h2>
          <div className="conf-step__wrap">
            <p>{filmsData.title}</p>
          </div>
          <div className="conf-step__wrap">
            <p>Время сеанса: {filmsData.time}</p>
          </div>
          <div className="conf-step__wrap">
            <ul className="conf-step__selectors-box">
              {halls.map((hall, index) => (
                <li key={hall.id + "price"}>
                  <InputHall
                    index={index}
                    name={hall.name}
                    id={hall.id}
                    isChecked={index == 0}
                    onChange={changeHallHandler}
                  />
                  <span className="conf-step__selector">{hall.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="conf-step__wrap">
            <label className="conf-step__label">
              Время начала сеанса:
              <input
                ref={startRef}
                className="conf-step__input"
                type="time"
                name="session-time"
                onChange={startHandleChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className="conf-step__button conf-step__button-accent"
          >
            Создать
          </button>
          <button
            type="button"
            onClick={onRemoveHandler}
            className="conf-step__button conf-step__button-regular"
          >
            Удалить фильм
          </button>
        </form>
      ) : (
        <h3>{message}</h3>
      )}
    </div>
  );
}
