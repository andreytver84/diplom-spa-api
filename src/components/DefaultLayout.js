import { Outlet } from "react-router-dom";
import "./DefaultLayout.css";
import React from "react";

export default function DefaultLayout() {
  return (
    <div className="wrap">
      <header className="page-header">
        <h1 className="page-header__title">
          Идём<span>в</span>кино
        </h1>
      </header>
      <Outlet />
    </div>
  );
}
