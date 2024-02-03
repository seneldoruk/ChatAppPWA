import { create } from "zustand";

type UserState = {
  token: string | null;
  setToken: (token: string) => void;
};
const useUserStore = create<UserState>((set) => ({
  token: localStorage.getItem("token"),
  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token });
  },
}));

export default useUserStore;
