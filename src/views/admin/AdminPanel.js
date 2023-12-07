import React, { useRef } from "react";
import ConfStep from "./ConfStep";
import HallConfCont from "./HallConfCont";

export default function AdminPanel() {
  return (
    <main className="conf-steps">
      <ConfStep title={"Управление залами"} paragraph={"Доступные залы"}>
        <HallConfCont />
      </ConfStep>
      <ConfStep title={"Управление залами 2"} paragraph={"Доступные залы2"}>
        <HallConfCont />
      </ConfStep>
    </main>
  );
}
