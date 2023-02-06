import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function FavoriteUsersModalList({ favoriteUSers }) {
  return (
    <ListGroup>
      {favoriteUSers?.map((user) => (
        <div className="data-item">
          <ListGroup.Item>
            <Link to={user.html_url} target="_blank" className="link-data-container">
              <div className="profile-item-container">
                <div className="profile-img-container">
                  <img
                    src={user.avatar_url}
                    alt="User profile icon"
                    width="50"
                  />
                </div>
                <div className="profile-info-container">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </Link>
          </ListGroup.Item>
        </div>
      ))}
    </ListGroup>
  );
}

export default FavoriteUsersModalList;
