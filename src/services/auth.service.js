import axios from "axios";
import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

//Not implemented
const getCommentsByUser = (username) => {
  return http.get("/profile", { headers: authHeader(), params: {username}});
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getCommentsByUser,
};