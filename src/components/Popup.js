export default function Popup({ children, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        {children}
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}
