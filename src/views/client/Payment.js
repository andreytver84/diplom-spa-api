import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../components/apiConfig";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function Payment() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isClicked, setIsClicked] = useState(false);
  let { uniqueCode } = useParams();
  console.log(uniqueCode);
  useEffect(() => {
    axios
      .get(`${BASE_URL}api/tickets.php`, {
        params: {
          uniqueCode: uniqueCode,
        },
      })
      .then((response) => {
        console.log("Успешно обновлено:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении:", error);
      });
  }, []);

  let price = 0;
  let tickets = [];
  if (data?.tickets_json) {
    tickets = JSON.parse(JSON.parse(data?.tickets_json));
    tickets.forEach((ticket) => {
      price = price + Number(ticket.price);
    });

    //console.log(tickets);
    //console.log(price);
  }

  const time = data?.start_session.slice(0, 5);

  const onClickHandler = () => {
    /*navigate(`/ticket/${ticketsData.uniqueCode}`);*/
    setIsClicked(true);
  };

  const backHandler = () => {
    setIsClicked(false);
    navigate(`/`);
  };

  const buttonBlock = (
    <div>
      <button
        className="acceptin-button"
        onClick={onClickHandler}
        /*  onclick="location.href='ticket.html'" */
      >
        Получить код бронирования
      </button>

      <p className="ticket__hint">
        После оплаты билет будет доступен в этом окне, а также придёт вам на
        почту. Покажите QR-код нашему контроллёру у входа в зал.
      </p>
      <p className="ticket__hint">Приятного просмотра!</p>
    </div>
  );

  return (
    <main>
      <section className="ticket">
        <header className="tichet__check">
          <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
        </header>

        <div className="ticket__info-wrapper">
          <p className="ticket__info">
            На фильм:
            <span className="ticket__details ticket__title">
              {data?.film_name}
            </span>
          </p>
          <p className="ticket__info">
            <span className="ticket__details ticket__chairs">
              Места:
              <br />
              {tickets.map((ticket, i) => (
                <span key={uniqueCode + i}>
                  ряд: {ticket.row} место: {ticket.place}
                  <br />
                </span>
              ))}
            </span>
          </p>
          <p className="ticket__info">{data?.hall_name}</p>
          <p className="ticket__info">
            Начало сеанса:
            <span className="ticket__details ticket__start">{time}</span>
          </p>
          <p className="ticket__info">
            Стоимость:
            <span className="ticket__details ticket__cost">{price}</span> рублей
          </p>
          {!isClicked ? (
            buttonBlock
          ) : (
            <>
              <div className="ticket__info-qr">
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`${BASE_URL}payment/${uniqueCode}`}
                />
              </div>
              <p className="ticket__hint">
                Покажите QR-код нашему контроллеру для подтверждения
                бронирования.
              </p>
              <p className="ticket__hint">Приятного просмотра!</p>
              <button
                className="acceptin-button"
                onClick={backHandler}
                /*  onclick="location.href='ticket.html'" */
              >
                Вернуться на главную
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
