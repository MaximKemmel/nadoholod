import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("nadoholod_token");
  return config;
});

export default instance;
