import axios from "axios";

const axiosInstance = axios.create({baseURL: 'https://lofanjedt.nl/'});

export default axiosInstance;