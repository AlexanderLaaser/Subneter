import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.xsrfCookieName = "CSRFTOKEN";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

// Axios Interceptor hinzufügen
axios.interceptors.request.use(
  (config) => {
    // CSRF-Token aus den Cookies holen
    const csrfToken = Cookies.get("CSRFTOKEN");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const token = Cookies.get("CSRFTOKEN");

const header = {
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": token,
  },
  withCredentials: true,
};

export const getAllVnets = async (isUserAuthenticated: boolean) => {
  if (isUserAuthenticated) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_SERVER_URL}/api/calculator/vnets/`
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch data!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            throw new Error("Unauthorized: No session or invalid credentials");
          } else if (error.response.status === 400) {
            throw new Error("Inputs invalid. Please check again!");
          } else {
            throw new Error("Server error!");
          }
        } else {
          throw new Error("Network error!");
        }
      } else {
        throw error;
      }
    }
  } else {
    console.log("User not authenticated");
    return "User not authenticated";
  }
};
