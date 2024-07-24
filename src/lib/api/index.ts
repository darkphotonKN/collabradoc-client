import axios from "axios";

// Primary Axios Instance
const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
});

export default axiosInstance;
