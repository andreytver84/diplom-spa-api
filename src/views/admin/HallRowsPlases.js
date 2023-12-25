import React, { useState } from "react";

export default function HallRowsPlases() {
  return (
    <div>
      <p className="conf-step__paragraph">
        Укажите количество рядов и максимальное количество кресел в ряду:
      </p>
      <div className="conf-step__legend">
        <label className="conf-step__label">
          Рядов, шт
          <input
            ref={refInputRows}
            type="text"
            className="conf-step__input"
            placeholder={rows}
            onChange={handleChangeRows}
          />
        </label>
        <span className="multiplier">x</span>
        <label className="conf-step__label">
          Мест, шт
          <input
            ref={refInputPlaces}
            type="text"
            className="conf-step__input"
            placeholder={places}
            onChange={handleChangePlaces}
          />
        </label>
      </div>
      <p className="conf-step__paragraph">
        Теперь вы можете указать типы кресел на схеме зала:
      </p>
      <div className="conf-step__legend">
        <span className="conf-step__chair conf-step__chair_standart"></span> —
        обычные кресла
        <span className="conf-step__chair conf-step__chair_vip"></span> — VIP
        кресла
        <span className="conf-step__chair conf-step__chair_disabled"></span> —
        заблокированные (нет кресла)
        <p className="conf-step__hint">
          Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
        </p>
      </div>

      <div className="conf-step__hall">
        <div className="conf-step__hall-wrapper">
          {newConfHall.map((row, i) => (
            <div key={i} className="conf-step__row">
              {row.map((place, j) => (
                <Place
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
      </div>

      <fieldset className="conf-step__buttons text-center">
        <button
          onClick={handleResetSubmit}
          className="conf-step__button conf-step__button-regular"
        >
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
