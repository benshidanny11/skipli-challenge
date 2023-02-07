const BASE_API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/"
    : "https://skiplibackend.herokuapp.com/api/";
const APIs = {
  SEND_ACCESS_CODE: `${BASE_API}createaccesscode`,
  VALIDATE_ACCESS_CODE: `${BASE_API}validateaccessescode`,
  SEARCH_GITHUB_USERS: `${BASE_API}searchgithubusers`,
  GET_GITHUB_USER: `${BASE_API}getgithubprofile`,
  LIKE_GITHUB_USER: `${BASE_API}likegithubuser`,
  GET_USER_PROFILE: `${BASE_API}getuserprofile`,
};
export default APIs;
