import React, { useState } from "react";
import Modal from "react-modal";

function ModalC({ id, firstName, lastName, phoneNumber, hideModalC }) {
  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal A</button>
      <Modal isOpen={isOpen}>
        <div className="modal-heading">
          <h1>Modal C</h1>
          <button className="close-btn" onClick={hideModalC}>
            Close
          </button>
        </div>
        <div className="modal-card">
          <p>Id: {id}</p>
          <p>First Name: {firstName}</p>
          <p>country: {lastName}</p>
          <p>Phone Number: {phoneNumber}</p>
        </div>
      </Modal>
    </div>
  );
}

export default ModalC;
