import axios from "axios";
import { constants } from "./constants";

let getToken = localStorage.getItem(constants.tokenStorageKey);

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.timeout = 60 * 1000;
axios.defaults.headers.common["Authorization"] = `Bearer ${getToken}`;

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);
