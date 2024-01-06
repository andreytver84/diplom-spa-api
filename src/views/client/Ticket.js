import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/apiConfig";

export default function Ticket() {
  const navigate = useNavigate();
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

  return (
    <main>
      <section className="ticket">
        <header className="tichet__check">
          <h2 className="ticket__check-title">Электронный билет</h2>
        </header>

        <div className="ticket__info-wrapper">
          <p className="ticket__info">
            На фильм:{" "}
            <span className="ticket__details ticket__title">
              Звёздные войны XXIII: Атака клонированных клонов
            </span>
          </p>
          <p className="ticket__info">
            Места: <span className="ticket__details ticket__chairs">6, 7</span>
          </p>
          <p className="ticket__info">
            В зале: <span className="ticket__details ticket__hall">1</span>
          </p>
          <p className="ticket__info">
            Начало сеанса:{" "}
            <span className="ticket__details ticket__start">18:30</span>
          </p>

          <img className="ticket__info-qr" src="i/qr-code.png" />

          <p className="ticket__hint">
            Покажите QR-код нашему контроллеру для подтверждения бронирования.
          </p>
          <p className="ticket__hint">Приятного просмотра!</p>
        </div>
      </section>
    </main>
  );
}
