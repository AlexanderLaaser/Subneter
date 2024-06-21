import { create, useStore } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface userStoreInterface {
  userLoginStatus: boolean;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  unsavedChanges?: boolean;
  setuserLoginStatus: (userLoggedIn: boolean) => void;
  setUsername: (username: string) => void;
  setFirstname: (username: string) => void;
  setLastname: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUnsavedChanges: (unsavedChanges: boolean) => void;
}

const userStore = create<userStoreInterface>()(
  devtools(
    (set) => ({
      userLoginStatus: localStorage.getItem("userLoginStatus") === "true",
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      unsavedChanges: false,
      setuserLoginStatus: (userLoginStatus) => {
        set(() => ({ userLoginStatus }));
        localStorage.setItem("userLoginStatus", String(userLoginStatus));
      },
      setUsername: (username: string) => set(() => ({ username })),
      setFirstname: (firstname: string) => set(() => ({ firstname })),
      setLastname: (lastname: string) => set(() => ({ lastname })),
      setEmail: (email: string) => set(() => ({ email })),
      setPassword: (password: string) => set(() => ({ password })),
      setUnsavedChanges: (unsavedChanges: boolean) =>
        set(() => ({ unsavedChanges })),
    }),
    {
      name: "UserStore",
    }
  )
);

export const useUserStore = () => {
  return useStore(userStore, (state) => ({
    userLoginStatus: state.userLoginStatus,
    username: state.username,
    firstname: state.firstname,
    lastname: state.lastname,
    email: state.email,
    password: state.password,
    unsavedChanges: state.unsavedChanges,
    setuserLoginStatus: state.setuserLoginStatus,
    setUsername: state.setUsername,
    setFirstname: state.setFirstname,
    setLastname: state.setLastname,
    setEmail: state.setEmail,
    setPassword: state.setPassword,
    setUnsavedChanges: state.setUnsavedChanges,
  }));
};
