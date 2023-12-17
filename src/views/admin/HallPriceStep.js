import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContentProvider";
import axios from "axios";
import InputHall from "./InputHall";

export default function HallCreateStep() {
  const { halls } = useStateContext();
  const [hallid, setHallid] = useState();
  const [hallname, setHallname] = useState("Зал 1");
  const [standartPrice, setStandartPrice] = useState(200);
  const [vipPrice, setVipPrice] = useState(350);
  const [data, setData] = useState();
  const [objectIndex, setObjectIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const standartInput = useRef();
  const vipInput = useRef();

  const changeHallHandler = (id, name, index) => {
    setHallid(id);
    setHallname(name);
    if (data && data[index]) {
      setObjectIndex(index);
      setStandartPrice(data[index].standart_price);
      standartInput.current.value = data[index].standart_price;
      setVipPrice(data[index].vip_price);
      vipInput.current.value = data[index].vip_price;
    }
  };

  const handleChangeStandartPrice = () => {
    setStandartPrice(standartInput.current.value);

    if (data) {
      const index = data.findIndex((hall) => hall.hall_id == hallid);
      const updatedData = data.map((item, indexData) =>
        indexData === index
          ? { ...item, standart_price: standartInput.current.value }
          : item
      );
      setData(updatedData);
    }
  };

  const handleChangeVipPrice = () => {
    setVipPrice(vipInput.current.value);

    if (data) {
      const index = data.findIndex((hall) => hall.hall_id == hallid);
      const updatedData = data.map((item, indexData) =>
        indexData === index
          ? { ...item, vip_price: vipInput.current.value }
          : item
      );
      setData(updatedData);
    }
  };
  const getFetch = () => {
    axios
      .get("http://localhost:80/api/priceconf.php")
      .then((response) => {
        if (response.data[0]) {
          setHallid(response.data[0].hall_id);
          setStandartPrice(response.data[0].standart_price);
          standartInput.current.value = response.data[0].standart_price;
          setData(response.data);
        }
        if (response.data[0]) {
          setStandartPrice(response.data[0].vip_price);
          vipInput.current.value = response.data[0].vip_price;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getFetch();
  }, []);

  //console.log(hallid);

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
        //console.log(response.data);
        getFetch();
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
                  isChecked={!isClicked ? index == 0 : false}
                  onClick={() => setIsClicked(true)}
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
