import React from "react";
import { useStateContext } from "../../contexts/ContentProvider";
import axios from "axios";
import { BASE_URL } from "../../components/apiConfig";

export default function OpeningStep() {
  const { sessionsDataCtx, hallConfCtx } = useStateContext();

  const openHandler = (event) => {
    event.preventDefault();
    //console.log(sessionsDataCtx);
    //console.log(hallConfCtx);

    const sessionsWithConfig = sessionsDataCtx.map((sessionGroup) => {
      return sessionGroup.map((session) => {
        const hallConfig = hallConfCtx.find(
          (config) => config.hall_id === session.hall_id
        );
        return {
          ...session,
          conf: hallConfig ? JSON.stringify(hallConfig.conf) : null,
        };
      });
    });

    //console.log(sessionsWithConfig);

    axios
      .post(`${BASE_URL}api/session_afisha.php`, sessionsWithConfig)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="conf-step__wrapper text-center">
      <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
      <button
        onClick={openHandler}
        className="conf-step__button conf-step__button-accent"
      >
        Открыть продажу билетов
      </button>
    </div>
  );
}
