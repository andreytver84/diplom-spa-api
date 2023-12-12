import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContentProvider";
import Place from "./Place";
import InputHall from "./InputHall";
import axios from "axios";

export default function HallConfStep() {
  const { halls } = useStateContext();
  const [rows, setRows] = useState(3);
  const [places, setPlaces] = useState(5);
  const [hallid, setHallid] = useState();
  const [hallname, setHallname] = useState("Зал 1");
  const [valfromdb, setValfromdb] = useState();
  //const [hallsobj, setHallsobj] = useState([]);

  const refInputRows = useRef();
  const refInputPlaces = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:80/api/hallconf.php")
      .then((response) => {
        setHallid(response.data[0].hall_id);
        setValfromdb(JSON.parse(response.data[0].conf));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //console.log(valfromdb);
  const changeHallHandler = (id, name) => {
    //setHallid(event.target.getAttribute("data-id"));
    setHallid(id);
    setHallname(name);
  };

  const handleSaveSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:80/api/hallconf.php", {
        html: JSON.stringify(newConfhall),
        id: hallid,
        name: hallname,
        rows: rows,
        places: places,
      })
      .then((response) => {
        //console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleResetSubmit = (event) => {
    event.preventDefault();
    setRows(0);
    setPlaces(0);
  };

  const handleChangeRows = () => {
    setRows(refInputRows.current.value);
  };

  const handleChangePlaces = () => {
    setPlaces(refInputPlaces.current.value);
  };

  const hall = [];
  const renderHall = () => {
    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < places; j++) {
        row.push({
          key: "row" + (i + 1) + "place" + (j + 1),
          row: i + 1,
          place: j + 1,
          classes: "conf-step__chair",
        });
      }
      hall.push(row);
    }

    return hall;
  };
  //console.log(renderHall());
  const newConfhall = renderHall();

  /*   useEffect(() => {
    setHallsobj(newConfhall);
  }, []); */

  const changeClassHandler = (row, place, classes) => {
    newConfhall[row][place].classes = "conf-step__chair " + classes;
    console.log(newConfhall);
  };

  return (
    <div className="conf-step__wrapper">
      <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
      <ul className="conf-step__selectors-box">
        {halls.length < 1
          ? "Нет залов"
          : halls.map((hall, index) => (
              <li key={hall.id}>
                <InputHall
                  index={index}
                  name={hall.name}
                  id={hall.id}
                  onChange={changeHallHandler}
                  isChecked={hallid == hall.id}
                />
                <span className="conf-step__selector">{hall.name}</span>
              </li>
            ))}
      </ul>
      <p className="conf-step__paragraph">
        Укажите количество рядов и максимальное количество кресел в ряду:
      </p>
      <div className="conf-step__legend">
        <label className="conf-step__label">
          Рядов, шт
          <input
            ref={refInputRows}
            type="text"
            className="conf-step__input"
            placeholder={rows}
            onChange={handleChangeRows}
          />
        </label>
        <span className="multiplier">x</span>
        <label className="conf-step__label">
          Мест, шт
          <input
            ref={refInputPlaces}
            type="text"
            className="conf-step__input"
            placeholder={places}
            onChange={handleChangePlaces}
          />
        </label>
      </div>
      <p className="conf-step__paragraph">
        Теперь вы можете указать типы кресел на схеме зала:
      </p>
      <div className="conf-step__legend">
        <span className="conf-step__chair conf-step__chair_standart"></span> —
        обычные кресла
        <span className="conf-step__chair conf-step__chair_vip"></span> — VIP
        кресла
        <span className="conf-step__chair conf-step__chair_disabled"></span> —
        заблокированные (нет кресла)
        <p className="conf-step__hint">
          Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
        </p>
      </div>

      <div className="conf-step__hall">
        <div className="conf-step__hall-wrapper">
          {newConfhall.map((row, i) => (
            <div key={i} className="conf-step__row">
              {row.map((place, j) => (
                <Place
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
      </div>

      <fieldset className="conf-step__buttons text-center">
        <button
          onClick={handleResetSubmit}
          className="conf-step__button conf-step__button-regular"
        >
          Отмена
        </button>
        <input
          onClick={handleSaveSubmit}
          type="submit"
          value="Сохранить"
          className="conf-step__button conf-step__button-accent"
        />
      </fieldset>
    </div>
  );
}
