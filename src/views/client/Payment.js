import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../components/apiConfig";
import { json, useParams } from "react-router-dom";

export default function Payment() {
  const [data, setData] = useState();
  let { uniqueCode } = useParams();
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

    console.log(tickets);
    console.log(price);
  }

  const time = data?.start_session.slice(0, 5);

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
                <span key={(uniqueCode = i)}>
                  ряд: {ticket.row} место: {ticket.place}
                  <br />
                </span>
              ))}
            </span>
          </p>
          <p className="ticket__info">{data?.hall_name}</p>
          <p className="ticket__info">
            Начало сеанса:{" "}
            <span className="ticket__details ticket__start">{time}</span>
          </p>
          <p className="ticket__info">
            Стоимость:{" "}
            <span className="ticket__details ticket__cost">{price}</span> рублей
          </p>

          <button
            className="acceptin-button"
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
      </section>
    </main>
  );
}
