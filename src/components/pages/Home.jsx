/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../items/Header";
import APIs from "../../constants/APIS";
import Pagination from "../items/Pagination";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../items/ProfileModal";
import Table from "react-bootstrap/Table";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingLikeUser, setLoadingLikeUser] = useState(false);
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingProfileUsers,setLoadingProfileUsers]=useState(false)
  const navigate = useNavigate();
  // const [itemOffset, setItemOffset] = useState(0);
  const myPhoneNumber = localStorage.getItem("phonenumber")?.replace("+", "%2b");

  useEffect(() => {
    if(!myPhoneNumber){
      navigate("/verifiphone");
    }
    fetchFavoriteUsers();
  }, []);

  const fetchFavoriteUsers = () => {
    setLoadingProfileUsers(true);
    axios
      .get(`${APIs.GET_USER_PROFILE}?phone_number=${myPhoneNumber}`)
      .then((response) => {
        setFavoriteUsers(response.data.users);
        setLoadingProfileUsers(false);
      }).catch((e)=>setLoadingProfileUsers(false));
  };

  const handleShowModal = () => {
   if(favoriteUsers.length===0){
    fetchFavoriteUsers();
   }
    setShowModal(true);
  };

  const searchInputHandler = (e) => {
    setSearchQuery(e.target.value);
  };
  const getUsersHandler = async () => {
    if (searchQuery.length === 0) {
      alert("Please enter something to search");
      return;
    }

    setLoadingUsers(true);
    try {
      const response = await axios.get(
        `${APIs.SEARCH_GITHUB_USERS}?query=${searchQuery}&page=${page}&per_page=${itemsPerPage}`
      );
      setUsers(response.data.users);
      setLoadingUsers(false);
    } catch (err) {
      setLoadingUsers(false);
    }
  };

  const likeGithubUser = async (user) => {
    setLoadingLikeUser(true);
    await axios.post(`${APIs.LIKE_GITHUB_USER}?github_user_id=${user.userId}`, {
      phone_number: "+250784871958",
    });
    setFavoriteUsers([...favoriteUsers, user ])
    fetchFavoriteUsers();
    setLoadingLikeUser(false);
  };

  const handlePageClick = (event) => {
    console.log(event.selected)
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
          <h1>Found github users</h1> <Pagination handlePageClick={handlePageClick} itemsPerPage={itemsPerPage} />
        </div>
        <Table striped bordered hover>
          <tr>
            <th className="table-header">Avatar url</th>
            <th>Id</th>
            <th>Login</th>
            <th>Html url</th>
            <th>Public repos</th>
            <th>Followers</th>
            <th>Option</th>
          </tr>
          <tbody>
            {loadingUsers ? (
              <p>Please wait</p>
            ) : (
              users.map((user) => (
                <tr>
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
                      <i class="fa-solid fa-heart"></i>
                    ) : (
                      <span onClick={async () => await likeGithubUser(user)}>
                        <i className="fa-regular fa-heart"></i>
                        <i class="fa-light fa-loader"></i>
                        <i class="fa-light fa-loader"></i>
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
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
