import axios from "axios";

const API = axios.create({
  baseURL: "https://student-management-back-vvhg.onrender.com/api"
});

export default API;