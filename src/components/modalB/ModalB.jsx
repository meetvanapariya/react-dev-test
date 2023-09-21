import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllCountry } from "../../api/api";
import ModalC from "../modalC/ModalC";
function ModalB() {
  const [isOpen, setIsOpen] = useState(true);
  const [contactData, setContactData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [timeDelay, setTimeDelay] = useState(100);
  const [isChecked, setIsChecked] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detailContact, setDetailContact] = useState(false);
  const [hideNextBtn, setHideNextBtn] = useState(false);
  const navigate = useNavigate();
  const modalContentRef = useRef(null);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setTimeDelay(500);
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTimeDelay(0);
      setSearchText(e.target.value);
    }
  };
  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      let params = `?companyId=560&countryId=226&page=${currentPage}&noGroupDuplicates=1`;

      if (searchText) {
        params += `&query=${searchText}`;
      }

      getAllCountry(params).then((res) => {
        const { contacts } = res.data;
        setContactData(contacts);
      });
    }, timeDelay); // Delay of 300 milliseconds

    return () => clearTimeout(delay); // Clear the timeout on component unmount
  }, [searchText, timeDelay]);

  const loadMoreData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    let newPage = currentPage + 1;
    setCurrentPage(newPage);
    let params = `?companyId=560&countryId=226&page=${newPage}&noGroupDuplicates=1`;

    if (searchText) {
      params += `&query=${searchText}`;
    }
    getAllCountry(params).then((res) => {
      const { contacts } = res.data;
      console.log(">>>", contacts);
      if (Object.keys(contacts).length) {
        let dataa = { ...contactData, ...contacts };
        setContactData(dataa);
      } else {
        setHideNextBtn(true);
      }
      setIsLoading(false);
    });
    setIsLoading(false);
  };

  const handleModalDetails = (contact) => {
    setDetailContact(contact);
    setShowModalC(true);
  };

  const handleHideModalC = () => {
    setShowModalC(false);
  };
  console.log(contactData);
  return (
    <div>
      {showModalC && (
        <ModalC
          hideModalC={handleHideModalC}
          id={detailContact.id}
          firstName={detailContact.first_name}
          lastName={detailContact.last_name}
          phoneNumber={detailContact.phone_number}
        />
      )}
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div className="modal-a-content">
          <div className="modal-heading">
            <h1>Modal A</h1>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
          <div className="search-box">
            <input
              type="text"
              name="search"
              id="search-bar"
              value={searchText}
              placeholder="Search by name and number.."
              onChange={handleSearch}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="modal-body" ref={modalContentRef}>
            {Object.keys(contactData)
              .reverse()
              .map((contactId) => {
                const contact = contactData[contactId];
                let isOdd = parseInt(contact.id) % 2;
                if (isChecked && isOdd == 1) return <></>;
                return (
                  <div
                    key={contact.id}
                    className="modal-card"
                    onClick={() => handleModalDetails(contact)}
                  >
                    <p>Id: {contact.id}</p>
                    <p>First Name: {contact.first_name}</p>
                    <p>country: {contact.country_id}</p>
                    <p>Phone Number: {contact.phone_number}</p>
                  </div>
                );
              })}
            {!hideNextBtn && contactData && (
              <div className="pagination" onClick={loadMoreData}>
                Next
              </div>
            )}
          </div>
          <input
            type="checkbox"
            id="only-even"
            name="only-even"
            onChange={handleCheckbox}
          />
          <label for="only-even"> Only even</label>
        </div>
      </Modal>
    </div>
  );
}

export default ModalB;
