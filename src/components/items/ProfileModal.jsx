import React from "react";
import Modal from "react-bootstrap/Modal";

import userIcon from "../../assets/images/avatar-img.png";
import FavoriteUsersModalList from "./FavoriteUsersList";

function ProfileModal(props) {
  const myPhoneNumber = localStorage.getItem("phonenumber");
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="profile-top">
            {" "}
            <div className="profile">
              <img src={userIcon} alt="Profle icon" width="50" />
            </div>
            <div className="profile-info-container">
              <p>{myPhoneNumber}</p>
              <p>{`Favolite users(${props.favoriteUSers?.length})`}</p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.loading ? (
          <p>Please wailt</p>
        ) : props.favoriteUSers?.length === 0 ? (
          <p>No users found</p>
        ) : (
          <FavoriteUsersModalList favoriteUSers={props.favoriteUSers} />
        )}
      </Modal.Body>
    </Modal>
  );
}
export default ProfileModal;
