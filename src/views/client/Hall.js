import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContentProvider";
import PlaceHall from "./PlaceHall";
import axios from "axios";
import { BASE_URL } from "../../components/apiConfig";
import { useParams, useNavigate } from "react-router-dom";

export default function Hall() {
  const { movieSession, setMovieSession } = useStateContext();
  const [vip, setVip] = useState();
  const [standart, setStandart] = useState();
  const [tickets, setTickets] = useState([]);
  const [conf, setConf] = useState([]);
  const [uniq, setUniq] = useState();
  const [isSucscessSendConf, setIsSucscessSendConf] = useState(false);
  const [isSucscessSendTickets, setIsSucscessSendTickets] = useState(false);

  let { sessionId } = useParams();
  const navigate = useNavigate();
  //console.log(movieSession.conf);
  if (movieSession.conf) {
    localStorage.setItem("dataConf", movieSession.conf);
    localStorage.setItem("dataTime", movieSession.start_Session.slice(0, 5));
    localStorage.setItem("dataHall", movieSession.hall_name);
    localStorage.setItem("dataFilm", movieSession.film_title);
    localStorage.setItem("date", movieSession.date);
    localStorage.setItem("sessionid", movieSession.session_id);
  }
  /* 
  let conf = JSON.parse(
    JSON.parse(JSON.parse(localStorage.getItem("dataConf")))
  ); */

  useEffect(() => {
    setConf(
      JSON.parse(JSON.parse(JSON.parse(localStorage.getItem("dataConf"))))
    );
    setUniq(Math.random().toString(36).substr(2, 9) + sessionId);
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}api/priceconf.php`)
      .then((response) => {
        const findHall = response.data.find(
          (hall) => hall.name === localStorage.getItem("dataHall")
        );
        setStandart(findHall.standart_price);
        setVip(findHall.vip_price);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const time = localStorage.getItem("dataTime");
  //console.log(conf);
  const changeClassHandler = (row, place, classes, oldclasses) => {
    const vipClass =
      oldclasses === "buying-scheme__chair_vip"
        ? " buying-scheme__chair_vip"
        : "";
    conf[+row][+place].classes =
      "buying-scheme__chair " + classes + " " + vipClass;
    setConf(conf);

    let updatedConf = JSON.stringify(JSON.stringify(JSON.stringify(conf)));
    //localStorage.setItem("dataConf", updatedConf);

    let tmpTicket = {
      row: row + 1,
      place: place + 1,
      price: oldclasses.includes("buying-scheme__chair_vip") ? vip : standart,
    };
    const containsTmpTicket = tickets.some(
      (ticket) =>
        ticket.row === tmpTicket.row && ticket.place === tmpTicket.place
    );

    if (containsTmpTicket) {
      const updatedTickets = tickets.filter(
        (ticket) =>
          !(ticket.row === tmpTicket.row && ticket.place === tmpTicket.place)
      );
      setTickets(updatedTickets);
    } else {
      setTickets((prev) => {
        return [...prev, tmpTicket];
      });
    }
  };

  const ticketsData = {
    start_session: localStorage.getItem("dataTime"),
    date: localStorage.getItem("date"),
    session_id: localStorage.getItem("sessionid"),
    film_name: localStorage.getItem("dataFilm"),
    hall_name: localStorage.getItem("dataHall"),
    tickets: JSON.stringify(tickets),
    uniqueCode: uniq,
  };

  //console.log(ticketsData);
  //console.log(conf);

  const confClone = JSON.parse(JSON.stringify(conf));
  const updatedData = confClone.map((row) => {
    return row.map((item) => {
      // Замена значений "buying-scheme__chair_selected" на "buying-scheme__chair_taken"
      item.classes = item.classes.replace(
        "buying-scheme__chair_selected",
        "buying-scheme__chair_taken"
      );
      // Замена значений "buying-scheme__chair_standart" на "buying-scheme__chair_standard"
      item.classes = item.classes.replace(
        "buying-scheme__chair_standart",
        "buying-scheme__chair_standard"
      );
      return item;
    });
  });

  const dataToSend = {
    session_id: sessionId,
    conf: JSON.stringify(JSON.stringify(updatedData)),
  };
  //console.log(conf);

  const orderHandler = () => {
    if (ticketsData.tickets.length > 1) {
      axios
        .put(`${BASE_URL}api/session_afisha.php`, dataToSend)
        .then((response) => {
          console.log("Успешно обновлено:", response.data);
          setIsSucscessSendConf(true);
        })
        .catch((error) => {
          console.error("Ошибка при обновлении:", error);
        });
      axios
        .post(`${BASE_URL}api/tickets.php`, ticketsData)
        .then((response) => {
          console.log("Успешно обновлено:", response.data);
          console.log(ticketsData);
          setIsSucscessSendTickets(true);
        })
        .catch((error) => {
          console.error("Ошибка при обновлении:", error);
        });
    }
  };

  if (isSucscessSendTickets && isSucscessSendConf) {
    navigate(`/payment/${ticketsData.uniqueCode}`);
  }

  return (
    <main>
      <section className="buying">
        <div className="buying__info">
          <div className="buying__info-description">
            <h2 className="buying__info-title">
              {localStorage.getItem("dataFilm")}
            </h2>
            <p className="buying__info-start">Начало сеанса: {time}</p>
            <p className="buying__info-hall">
              {localStorage.getItem("dataHall")}
            </p>
          </div>
          <div className="buying__info-hint">
            <p>
              Тапните дважды,
              <br />
              чтобы увеличить
            </p>
          </div>
        </div>
        <div className="buying-scheme">
          <div className="buying-scheme__wrapper">
            {conf.map((row, i) => (
              <div key={i} className="buying-scheme__row">
                {row.map((place, j) => (
                  <PlaceHall
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
          <div className="buying-scheme__legend">
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>{" "}
                Свободно (
                <span className="buying-scheme__legend-value">250</span>руб)
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>{" "}
                Свободно VIP (
                <span className="buying-scheme__legend-value">350</span>руб)
              </p>
            </div>
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>{" "}
                Занято
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_selected"></span>{" "}
                Выбрано
              </p>
            </div>
          </div>
        </div>
        <button
          className="acceptin-button"
          disabled={JSON.parse(ticketsData.tickets).length < 1}
          onClick={orderHandler}
        >
          Забронировать
        </button>
      </section>
    </main>
  );
}
