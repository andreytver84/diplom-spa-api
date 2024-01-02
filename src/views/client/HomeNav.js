import React, { useState } from "react";
import HomeNavDay from "./HomeNavDay";

export default function HomeNav(props) {
  const [clickedIndex, setClickedIndex] = useState(null);

  // Функция для получения дня недели по его номеру
  function getDayOfWeekText(dayOfWeek) {
    const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    return daysOfWeek[dayOfWeek];
  }

  // Создаем массив для хранения результатов
  const datesArray = [];

  // Получаем текущую дату
  const currentDate = new Date();

  // Добавляем текущую дату в массив
  datesArray.push({
    dayOfMonth: currentDate.getDate(),
    dayOfWeek: getDayOfWeekText(currentDate.getDay()),
    month: currentDate.toLocaleString("ru", { month: "long" }),
  });

  // Добавляем следующие 6 дней в массив
  for (let i = 1; i < 7; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    datesArray.push({
      dayOfMonth: nextDate.getDate(),
      dayOfWeek: getDayOfWeekText(nextDate.getDay()),
      month: nextDate.toLocaleString("ru", { month: "long" }),
    });
  }

  const clickDayHandle = (index, day, month) => {
    // event.preventDefault();
    setClickedIndex(index);
    //console.log(datesArray[index]);
    props.onChangeDate(day, month);
  };

  return (
    <nav className="page-nav">
      {datesArray.map((day, index) => (
        <HomeNavDay
          clickHandle={clickDayHandle}
          key={day.dayOfMonth + day.dayOfWeek}
          dayOfMonth={day.dayOfMonth}
          dayOfWeek={day.dayOfWeek}
          month={day.month}
          index={index}
          isClicked={clickedIndex === index}
        />
      ))}
    </nav>
  );
}
