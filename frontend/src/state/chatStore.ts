import { create } from "zustand";
import { ChatOverView } from "../utils/idb/idbUtils";
import { MessageProps } from "../components/main/chat/Message";

type ChatStore = {
  activeChatScreen: { email: string; name: string } | null;
  setActiveChatScreen: (email: string, name: string) => void;
  closeChatScreen: () => void;

  activeMessages: MessageProps[] | null;

  chatOverviews: ChatOverView[] | null;
  setChatOverviews: (chatOverviews: ChatOverView[]) => void;
};
const useChatStore = create<ChatStore>((set) => ({
  activeChatScreen: null,
  setActiveChatScreen: (email: string, name: string) =>
    set({ activeChatScreen: { email, name } }),
  closeChatScreen: () => set({ activeChatScreen: null, activeMessages: null }),

  activeMessages: null,
  setActiveMessages: (messages: MessageProps[]) =>
    set({
      activeMessages: messages,
    }),

  chatOverviews: null,
  setChatOverviews: (chatOverviews: ChatOverView[]) =>
    set({
      chatOverviews: chatOverviews.sort().reverse(),
    }),
}));

export default useChatStore;
