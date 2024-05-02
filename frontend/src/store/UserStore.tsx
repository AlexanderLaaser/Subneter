import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface userStoreInterface {
  userLoginStatus: boolean;
  setuserLoginStatus: (userLoggedIn: boolean) => void;
}

const userStore = create<userStoreInterface>()(
  devtools((set) => ({
    userLoginStatus: false,
    setuserLoginStatus: (userLoginStatus) =>
      set((state) => ({ userLoginStatus: userLoginStatus })),
  }))
);

export default userStore;
