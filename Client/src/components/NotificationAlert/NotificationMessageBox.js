import React, { useRef } from "react";
import "./NotificationMessageBox.css";

function NotificationMessageBox({ setOpenModal, message, operationDone ,cleartimer}) {
  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      // cleartimer();
      setOpenModal(false);
    }
  };


  return (
    <div onClick={closeModal} ref={modalRef} className="modalBackground">
      <div className="notification-box-modalContainer" >
        <img className="notification-box-img" src="GroupSucessTick.svg" alt="GroupSucessTick" />
        <div className="notification-box-operation-name">{operationDone}</div>
        {message!=="" && <div className="notification-box-message">{message}</div>}
      </div>
    </div>
  );
}

export default NotificationMessageBox;
