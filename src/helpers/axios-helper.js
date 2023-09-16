import axios from "axios";

export const baseUrl = "https://lofanjedt.nl/api";
// const baseUrl = "http://192.168.68.126:8000/api";;

const axiosInstance = axios.create({ baseURL: baseUrl });

export default axiosInstance;
