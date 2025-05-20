"use client";
import { createContext, useContext, useState } from "react";

import { Message } from "@/interfaces/IMessage";

interface ChatBotContextType {
  messages: Message[];
  addMessage: (content: string, sender: "user" | "bot") => void;
  clearMessages: () => void;
  isOpen: boolean;
  toggleChat: () => void;
}

export const ChatBotContext = createContext<ChatBotContextType | null>(null);

export const useChatBot = () => {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error("useChatBot must be used within a ChatBotProvider");
  }
  return context;
};

function ChatBotProvider({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addMessage = (content: string, sender: "user" | "bot") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ChatBotContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        isOpen,
        toggleChat,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
}

export default ChatBotProvider;
