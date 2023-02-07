/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../items/Header";
import APIs from "../../constants/APIS";
import Pagination from "../items/Pagination";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../items/ProfileModal";
import Table from "react-bootstrap/Table";

function Home() {
// States and variables
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingProfileUsers, setLoadingProfileUsers] = useState(false);
  const navigate = useNavigate();
  const myPhoneNumber = localStorage
    .getItem("phonenumber")
    ?.replace("+", "%2b");

    const fetchFavoriteUsers = useCallback(() => {
      setLoadingProfileUsers(true);
      axios
        .get(`${APIs.GET_USER_PROFILE}?phone_number=${myPhoneNumber}`)
        .then((response) => {
          setFavoriteUsers(response.data.users);
          setLoadingProfileUsers(false);
        })
        .catch((e) => setLoadingProfileUsers(false));
    },[myPhoneNumber]);

  useEffect(() => {
    if (!myPhoneNumber) {
      navigate("/verifiphone");
    }
    fetchFavoriteUsers();
  }, [fetchFavoriteUsers, myPhoneNumber, navigate]);

  // Handler functions
  

  const handleShowModal = () => {
    if (favoriteUsers.length === 0) {
      fetchFavoriteUsers();
    }
    setShowModal(true);
  };

  const searchInputHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const getUsersHandler = async () => {
    if (searchQuery.length === 0) {
      alert("Please enter something in search field.");
      return;
    }

    setLoadingUsers(true);
    try {
      const response = await axios.get(
        `${APIs.SEARCH_GITHUB_USERS}?query=${searchQuery}&page=${page}&per_page=${itemsPerPage}`
      );
      setUsers(response.data.users);
      setTotalRows(response.data.totalRows);
      setLoadingUsers(false);
    } catch (err) {
      setLoadingUsers(false);
    }
  };

  const likeGithubUser = async (id) => {
    await axios.post(`${APIs.LIKE_GITHUB_USER}?github_user_id=${id}`, {
      phone_number: "+250784871958",
    });
    fetchFavoriteUsers();
  };

  const handlePageClick = (event) => {
    setPage(event.selected);
    getUsersHandler();
  };


  return (
    <div>
      <Header
        searchInputHandler={searchInputHandler}
        getUsersHandler={getUsersHandler}
        getProfileHandler={handleShowModal}
        enterKeyEventHandler={(e) => {
          if (e.keyCode === 13) {
            getUsersHandler();
          }
        }}
      />
      <hr />
      <div className="container container-fluid">
        <div className="middle-header-container">
          {" "}
          <h3>Found github users</h3>{" "}
          <div className="page-size-container">
            <p>Choose page size</p>
            <select
              id=""
              onChange={(e) => {
                getUsersHandler();
                setItemsPerPage(e.target.value);
              }}
              className="form-text"
            >
              <option value={5}>{5}</option>
              <option value={10}>{10}</option>
              <option value={15}>{15}</option>
            </select>{" "}
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th className="table-header">Avatar url</th>
            <th>Id</th>
            <th>Login</th>
            <th>Html url</th>
            <th>Public repos</th>
            <th>Followers</th>
            <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {loadingUsers
              ? "Please wait..."
              : users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <a href={user.avatar_url} target="_blank">
                        <img src={user.avatar_url} alt="" width={50} />
                      </a>
                    </td>
                    <td>{user.id}</td>
                    <td>{user.login}</td>
                    <td>
                      <a href={user.html_url} target="_blank">
                        {user.html_url}
                      </a>
                    </td>
                    <td>{user.public_repos}</td>
                    <td>{user.followers}</td>
                    <td>
                      {favoriteUsers.some((u) => u.id === user.id) ? (
                        <i className="fa-solid fa-heart"></i>
                      ) : (
                        <span
                          onClick={async () => await likeGithubUser(user.id)}
                        >
                          <i className="fa-regular fa-heart"></i>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
        <Pagination
          handlePageClick={handlePageClick}
          itemsPerPage={itemsPerPage}
          totalRows={totalRows}
        />
      </div>
      <ProfileModal
        show={showModal}
        onHide={() => setShowModal(false)}
        favoriteUSers={favoriteUsers}
        loading={loadingProfileUsers}
      />
    </div>
  );
}

export default Home;
