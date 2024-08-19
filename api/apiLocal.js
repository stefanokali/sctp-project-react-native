import axios from "axios";

/*
  Base URL of the backend server 
*/
const BASE_URL = "http://localhost:8080/";
const apiLocal = axios.create({ baseURL: BASE_URL });

export default apiLocal;