import React, { useEffect, useRef, useState, useMemo } from "react";
import Place from "./Place";
import axios from "axios";
import SelectHall from "./SelectHall";
import { useStateContext } from "../../contexts/ContentProvider";

export default function HallConfStep() {
  const { halls } = useStateContext();
  const [rows, setRows] = useState(3);
  const [places, setPlaces] = useState(5);
  const [hallid, setHallid] = useState();
  const [hallname, setHallname] = useState("Зал 1");
  const [data, setData] = useState();
  const [newConfHall, setNewConfHall] = useState([]);

  const refInputRows = useRef();
  const refInputPlaces = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:80/api/hallconf.php")
      .then((response) => {
        if (response.data[0]) {
          setHallid(response.data[0]?.hall_id);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (hallid) {
    const selectedHall = data?.find((hall) => hall.hall_id === hallid);
    /*     if (selectedHall) {
      setNewConfHall(JSON.parse(selectedHall.conf));
    } */
  }
  if (!hallid && halls[0]) {
    setHallid(halls[0].id);
  }
  //console.log(data);
  const changeHallHandler = (id, name, index) => {
    setHallid(id);
    setHallname(name);
  };

  const handleSaveSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:80/api/hallconf.php", {
        html: JSON.stringify(newConfHall),
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
    setRows(+refInputRows.current.value);
  };

  const handleChangePlaces = () => {
    setPlaces(+refInputPlaces.current.value);
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

  useEffect(() => {
    setNewConfHall(renderHall());
  }, [rows, places]);

  const changeClassHandler = (row, place, classes) => {
    newConfHall[row][place].classes = "conf-step__chair " + classes;
  };

  return (
    <div className="conf-step__wrapper">
      <SelectHall ChangeHandler={changeHallHandler} />
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
          {newConfHall.map((row, i) => (
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
