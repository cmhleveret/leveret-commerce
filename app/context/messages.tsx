import { nanoid } from 'nanoid';
import { ReactNode, createContext, useState } from 'react';
import { Message } from '../../lib/validators/message';

export const MessagesContext = createContext<{
  messages: Message[];
  isMessageUpdating: boolean;
  // eslint-disable-next-line no-unused-vars
  addMessage: (message: Message) => void;
  // eslint-disable-next-line no-unused-vars
  removeMessage: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  // eslint-disable-next-line no-unused-vars
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {}
});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      text: 'Hello, how can I help you?',
      isUserMessage: false
    }
  ]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  // eslint-disable-next-line no-unused-vars
  const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            text: updateFn(message.text)
          };
        }
        return message;
      })
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        isMessageUpdating,
        setIsMessageUpdating
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
