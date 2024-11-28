import { AxiosInstance } from "axios";
let axiosInstance: AxiosInstance;

axiosInstance = require("./server-axios").default;

export default axiosInstance;
