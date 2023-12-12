import React, { useRef } from "react";
import { useStateContext } from "../../contexts/ContentProvider";
import axios from "axios";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();

  const { setToken } = useStateContext();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    axios
      .post("http://localhost:80/api/login.php", payload)
      .then(({ data }) => {
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <main>
      <section className="login">
        <header className="login__header">
          <h2 className="login__title">Авторизация</h2>
        </header>
        <div className="login__wrapper">
          <form className="login__form" onSubmit={onSubmitHandler}>
            <label className="login__label" htmlFor="email">
              E-mail
              <input
                ref={emailRef}
                className="login__input"
                type="email"
                placeholder="example@domain.xyz"
                name="email"
              />
            </label>
            <label className="login__label" htmlFor="pwd">
              Пароль
              <input
                ref={passRef}
                className="login__input"
                type="password"
                placeholder=""
                name="password"
              />
            </label>
            <div className="text-center">
              <input
                value="Авторизоваться"
                type="submit"
                className="login__button"
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
