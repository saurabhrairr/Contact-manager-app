import React, { useRef } from "react";
import "./DeleteContactsBox.css";

function DeleteContactsBox({ setOpenModal, replyDeleteYes }) {
  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
    }
  };


  return (
    <div onClick={closeModal} ref={modalRef} className="modalBackground">
      <div className="modalContainer" >
        <img className="delete-contact-box-img" src="deleteMessageIcon.svg" alt="deleteMessageIcon" />
        <div className="delete-contact-box-name">Delete Contacts</div>
        <div className="delete-contact-box-msg">Sure you want delete these Contacts?</div>
        <div className="delete-contact-box-button-container">
          <div onClick={() => { modalRef.current.click(); }} id="cancelBtn">Cancel</div>
          <div onClick={() => { replyDeleteYes(); }} id="OkayBtn">OK</div>
        </div>
      </div>
    </div>

  );
}

export default DeleteContactsBox;
