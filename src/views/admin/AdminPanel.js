import React, { useRef } from "react";
import ConfStep from "./ConfStep";
import HallCreateStep from "./HallCreateStep";
import HallConfStep from "./HallConfStep";
import HallPriceStep from "./HallPriceStep";

export default function AdminPanel() {
  return (
    <main className="conf-steps">
      <ConfStep title={"Управление залами"}>
        <HallCreateStep />
      </ConfStep>
      <ConfStep title={"Конфигурация залов"}>
        <HallConfStep />
      </ConfStep>
      <ConfStep title={"Конфигурация цен"}>
        <HallPriceStep />
      </ConfStep>
    </main>
  );
}
