import React, { useEffect, useState } from "react";
import HomeNav from "./HomeNav";
import Movie from "./Movie";
import axios from "axios";
import { BASE_URL } from "../../components/apiConfig";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [halls, setHalls] = useState([]);
  const [sessionDat, setSessionDat] = useState(new Date());
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios(`${BASE_URL}api/films.php`)
      .then(({ data }) => {
        //console.log(data);
        setFilms(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios(`${BASE_URL}api/halls.php`)
      .then(({ data }) => {
        //console.log(data);
        setHalls(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios(`${BASE_URL}api/session_afisha.php`)
      .then(({ data }) => {
        //console.log(data);
        setSessions(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function parseDateFromString(dateString) {
    // Разделение строки даты на месяц и число
    const [month, day] = dateString.split(" ");

    // Получение числового значения месяца
    const monthIndex = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ].indexOf(month);

    // Создание объекта Date
    const date = new Date(new Date().getFullYear(), monthIndex, day);

    return date;
  }

  const setDateHandle = (day, month) => {
    setSessionDat(parseDateFromString(day + " " + month));
  };

  let filteredSessions = [];

  if (sessionDat) {
    filteredSessions = sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      return (
        sessionDate.getDate() === sessionDat.getDate() &&
        sessionDate.getMonth() === sessionDat.getMonth() &&
        sessionDate.getFullYear() === sessionDat.getFullYear()
      );
    });
    // Вывод отфильтрованного массива
    //console.log(filteredSessions);
  }
  /*   useEffect(() => {
    setSession(filteredSessions);
  }, [sessionDat]);

  console.log(session); */

  return (
    <React.Fragment>
      <HomeNav onChangeDate={setDateHandle} />
      <main>
        {films.map((film) => (
          <Movie
            data={filteredSessions.filter(
              (session) => session.film_id == film.id
            )}
            key={film.id}
            title={film.title}
            description={film.description}
            image={film.image}
            time={film.time}
            halls={halls}
          />
        ))}
      </main>
    </React.Fragment>
  );
}
