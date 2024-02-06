import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SEND_MESSAGE } from "../../api/queriesandmutations";
import useChatStore from "../../state/chatStore";
import {
  addMessage,
  getDatabase,
  getOverviews,
  setLastMessageForEmail,
  setNameForEmail,
} from "../../utils/idb/idbUtils";

export default function useNewChat() {
  const [sendMessage, { loading, error, reset }] = useMutation(SEND_MESSAGE);
  const newChatSchena = z.object({
    name: z.string().min(1, { message: "Name can't be empty" }),
    email: z.string().email({ message: "Invalid Email" }),
    message: z.string().min(1, { message: "Name can't be empty" }),
  });
  type newChat = z.infer<typeof newChatSchena>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors: { email: emailError, name: nameError, message: messageError },
      touchedFields: {
        email: emailTouched,
        name: nameTouched,
        message: messageTouched,
      },
    },
  } = useForm<newChat>({
    mode: "onChange",
    resolver: zodResolver(newChatSchena),
  });
  const allFieldsTouched = emailTouched && nameTouched && messageTouched;
  const disabled =
    Boolean(emailError || nameError || messageError) || !allFieldsTouched;

  const setOverviews = useChatStore((state) => state.setChatOverviews);

  async function saveToDBAndGetChatOverviews(
    name: string,
    email: string,
    message: string,
  ) {
    const db = await getDatabase();
    const timestamp = Date.now().toString();

    await sendMessage({
      variables: { content: message, toEmail: email },
    });

    if (!error) {
      await addMessage(db, {
        message: message,
        sentBy: "me",
        timestamp: timestamp,
        theirEmail: email,
      });
      await setLastMessageForEmail(db, email, message, timestamp);
      await setNameForEmail(db, email, name);
    }
    setValue("name", "");
    setValue("email", "");
    setValue("message", "");
    return getOverviews(db);
  }

  const onSubmit = (data: newChat) => {
    const { name, email, message } = data;
    saveToDBAndGetChatOverviews(name, email, message).then(setOverviews);
  };

  return {
    register,
    handleSubmit,
    setValue,
    disabled,
    loading,
    onSubmit,
    emailError,
    nameError,
    messageError,
  };
}
