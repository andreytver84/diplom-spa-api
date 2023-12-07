import { Navigate, Outlet } from "react-router-dom";
import "./AdminLayout.css";
import { useStateContext } from "../contexts/ContentProvider";
import React from "react";

export default function AdminLayout() {
  // const { user, token } = useStateContext();
  const { token, setToken } = useStateContext();

  const logoutHandler = () => {
    setToken(null);
  };

  return (
    <div className="wrap">
      <header className="page-header">
        <h1 className="page-header__title">
          Идём<span>в</span>кино
        </h1>
        <span className="page-header__subtitle">Администраторррская</span>
        {token && (
          <button className="logout-button" onClick={logoutHandler}>
            Выйти
          </button>
        )}
      </header>
      <Outlet />
      {!token && <Navigate to="/login" />}
      {token && <Navigate to="/adminpanel" />}
    </div>
  );
}
