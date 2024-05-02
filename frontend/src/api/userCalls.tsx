import axios from "axios";
import Cookies from "js-cookie";
import { iUser } from "../interfaces/iUser";

axios.defaults.xsrfCookieName = "CSRFTOKEN";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const token = Cookies.get("CSRFTOKEN");

const header = {
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": token,
  },
  withCredentials: true,
};

export const registerUser = async (user: iUser) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/api/user/register_user`,
      user,
      header
    );

    if ((response.status = 200)) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data!");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response) {
        if (error.response.status === 400) {
          throw new Error("Inputs invalid. Please check again!");
        } else if (error.response.status === 500) {
          throw new Error("Server error!");
        }
      } else {
        throw new Error("Network error!");
      }
    } else {
      throw error;
    }
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/api/user/login_user`,
      {
        username,
        password,
      },
      header
    );

    if ((response.status = 200)) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data!");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response) {
        if (error.response.status === 400) {
          throw new Error("Inputs invalid. Please check again!");
        } else if (error.response.status === 500) {
          throw new Error("Server error!");
        }
      } else {
        throw new Error("Network error!");
      }
    } else {
      throw error;
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_SERVER_URL}/api/user/get_current_user`,
      header
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
          throw new Error("Unauthorized: No session or session expired");
        } else if (error.response.status === 403) {
          throw new Error(
            "Access Denied: You do not have permission to access this data"
          );
        } else if (error.response.status === 400) {
          throw new Error("Bad Request: Check your request format");
        } else if (error.response.status === 500) {
          throw new Error("Server Error: Problem handling your request");
        }
      } else {
        throw new Error("Network Error: Unable to reach the server");
      }
    } else {
      throw error;
    }
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_SERVER_URL}/api/user/logout_user`,
      {},
      header
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data!");
    }
  } catch (error) {
    throw error;
  }
};
