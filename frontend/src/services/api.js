import axios from "axios";
import keycloak from "./keycloak";

const api = axios.create({
  baseURL: "https://pumiroots-backend.onrender.com",
});

api.interceptors.request.use((config) => {
  if (keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

export default api;