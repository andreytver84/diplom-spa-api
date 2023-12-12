import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContentProvider";
import axios from "axios";
import InputHall from "./InputHall";

export default function HallCreateStep() {
  const { halls } = useStateContext();
  const [hallid, setHallid] = useState(1);
  const [hallname, setHallname] = useState("Зал 1");
  const [standartPrice, setStandartPrice] = useState(200);
  const [vipPrice, setVipPrice] = useState(350);

  const standartInput = useRef();
  const vipInput = useRef();

  const changeHallHandler = (id, name) => {
    //setHallid(event.target.getAttribute("data-id"));
    setHallid(id);
    setHallname(name);
  };

  const handleChangeStandartPrice = () => {
    setStandartPrice(standartInput.current.value);
  };

  const handleChangeVipPrice = () => {
    setVipPrice(vipInput.current.value);
  };

  const handleSaveSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:80/api/priceconf.php", {
        id: hallid,
        name: hallname,
        standart_price: standartPrice,
        vip_price: vipPrice,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="conf-step__wrapper">
      <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
      <ul className="conf-step__selectors-box">
        {halls.length < 1
          ? "Нет залов"
          : halls.map((hall, index) => (
              <li key={hall.id + "price"}>
                <InputHall
                  index={index}
                  name={hall.name}
                  id={hall.id}
                  onChange={changeHallHandler}
                />
                <span className="conf-step__selector">{hall.name}</span>
              </li>
            ))}
      </ul>

      <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
      <div className="conf-step__legend">
        <label className="conf-step__label">
          Цена, рублей
          <input
            ref={standartInput}
            name="standart-price"
            type="text"
            className="conf-step__input"
            placeholder="0"
            defaultValue={standartPrice}
            onChange={handleChangeStandartPrice}
          />
        </label>
        за <span className="conf-step__chair conf-step__chair_standart"></span>
        обычные кресла
      </div>
      <div className="conf-step__legend">
        <label className="conf-step__label">
          Цена, рублей
          <input
            ref={vipInput}
            name="vip-price"
            type="text"
            className="conf-step__input"
            placeholder="0"
            defaultValue={vipPrice}
            onChange={handleChangeVipPrice}
          />
        </label>
        за <span className="conf-step__chair conf-step__chair_vip"></span> VIP
        кресла
      </div>

      <fieldset className="conf-step__buttons text-center">
        <button className="conf-step__button conf-step__button-regular">
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
