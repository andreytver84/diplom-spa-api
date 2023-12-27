import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../components/apiConfig";

export default function AddFilmForm({ addHandler }) {
  const [message, setMessage] = useState();

  // не смог реализовать отправку объекта form через axios, file-film пустой отправлялся
  const [form, setForm] = useState({
    "title-film": "",
    "desc-film": "",
    "time-film": "",
    "file-film": null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file-film") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title-film", form["title-film"]);
    formData.append("desc-film", form["desc-film"]);
    formData.append("time-film", form["time-film"]);
    formData.append("file-film", form["file-film"]);

    axios
      .post(`${BASE_URL}api/films.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      /* .post("http://localhost:80/api/films.php", form) */
      .then(({ data }) => {
        setMessage(data.message);
        setTimeout(() => {
          addHandler();
          setMessage();
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {!message ? (
        <form onSubmit={submitHandler}>
          <h2>Добавить новый фильм</h2>
          <div className="conf-step__wrap">
            <label className="conf-step__label">
              Название фильма
              <input
                className="conf-step__input"
                type="text"
                name="title-film"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="conf-step__wrap">
            <label className="conf-step__label">
              Описание фильма
              <textarea
                className="conf-step__textarea"
                name="desc-film"
                onChange={handleChange}
              ></textarea>
            </label>
          </div>
          <div className="conf-step__wrap">
            <label className="conf-step__label">
              Длительность фильма, мин
              <input
                className="conf-step__input"
                type="number"
                name="time-film"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="conf-step__wrap">
            <label className="conf-step__label">
              Изображение фильма, jpg
              <input
                className="conf-step__input"
                type="file"
                accept=".jpg,.jpeg"
                name="file-film"
                onChange={handleChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className="conf-step__button conf-step__button-accent"
          >
            Создать
          </button>
        </form>
      ) : (
        <h3>{message}</h3>
      )}
    </div>
  );
}
