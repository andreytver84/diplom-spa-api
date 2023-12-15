import React, { useRef } from "react";
import "./Modal.css";

export default function Modal({ active, setActive, children }) {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <a className="modal-close-btn" onClick={() => setActive(false)}>
          &#x2716;
        </a>
        <div>{children}</div>
      </div>
    </div>
  );
}
