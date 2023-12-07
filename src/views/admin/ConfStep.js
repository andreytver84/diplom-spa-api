import React, { Children, useRef } from "react";

export default function ConfStep(props) {
  const { title, paragraph, children } = props;

  const headersRef = useRef([]);
  const accordionClickHandler = () => {
    headersRef.current.classList.toggle("conf-step__header_closed");
  };

  return (
    <section className="conf-step">
      <header
        ref={headersRef}
        onClick={accordionClickHandler}
        className="conf-step__header conf-step__header_opened"
      >
        <h2 className="conf-step__title">{title}</h2>
      </header>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">{paragraph}:</p>
        {children}
      </div>
    </section>
  );
}
