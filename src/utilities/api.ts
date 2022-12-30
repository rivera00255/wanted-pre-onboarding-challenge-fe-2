import axios from "axios";
import { LoginUser } from "../recoils/auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    // console.log("interceptor request");
    const user = localStorage.getItem("user");
    if (user !== null) {
      const auth: LoginUser = JSON.parse(user);
      config.headers!.Authorization = `${auth.token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
