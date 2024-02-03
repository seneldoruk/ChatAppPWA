import { create } from "zustand";

type ChatStore = {
  activeChatScreen: { email: string; name: string } | null;
  setActiveChatScreen: (email: string, name: string) => void;
  closeChatScreen: () => void;
};
const useChatStore = create<ChatStore>((set) => ({
  activeChatScreen: null,
  setActiveChatScreen: (email: string, name: string) =>
    set({ activeChatScreen: { email, name } }),
  closeChatScreen: () => set({ activeChatScreen: null }),
}));

export default useChatStore;
