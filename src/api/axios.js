// axios.js

import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://mern-crud-auth-be.onrender.com",
  withCredentials: true,
});

export default instance;
