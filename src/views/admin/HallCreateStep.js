import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContentProvider";

export default function HallCreateStep() {
  const refInput = useRef();
  const refButton = useRef([]);

  const { halls, setHalls } = useStateContext();

  //const [halls, setHalls] = useState([]);
  const [newHallName, setNewHallName] = useState("");

  // Загрузка списка кинозалов из базы данных при монтировании компонента
  useEffect(() => {
    fetchHalls();
  }, []);

  // Загрузка списка кинозалов из базы данных
  const fetchHalls = async () => {
    try {
      const response = await axios.get("http://localhost:80/api/halls.php");
      setHalls(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Удаление кинозала из базы данных и обновление списка
  const deleteHall = async (hallId) => {
    console.log(hallId);
    try {
      await axios.delete(`http://localhost:80/api/halls.php?id=${hallId}`);
      fetchHalls();
    } catch (error) {
      console.error(error);
    }
  };

  // Добавление нового кинозала в базу данных и обновление списка
  const createHall = async () => {
    try {
      console.log(refInput.current.value);
      await axios.post("http://localhost:80/api/halls.php", {
        name: refInput.current.value,
      });
      setNewHallName("");
      fetchHalls();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="conf-step__wrapper">
      <p className="conf-step__paragraph">Доступные залы:</p>
      <ul className="conf-step__list">
        {typeof halls === "string"
          ? "222"
          : halls.map((hall) => (
              <li key={hall.id}>
                {hall.name}
                <button
                  className="conf-step__button conf-step__button-trash"
                  onClick={() => deleteHall(hall.id)}
                ></button>
              </li>
            ))}
      </ul>

      <h2>Добавить новый кинозал</h2>
      <input className="conf-step__input" type="text" ref={refInput} />
      <button
        className="conf-step__button conf-step__button-accent"
        onClick={createHall}
      >
        Создать новый зал
      </button>
    </div>
  );
}
