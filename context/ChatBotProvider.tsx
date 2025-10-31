"use client";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { Message } from "@/interfaces/IMessage";

interface ChatBotContextType {
  messages: Message[];
  addMessage: (content: string, sender: "user" | "bot") => void;
  clearMessages: () => void;
  isOpen: boolean;
  toggleChat: () => void;
  isChatUp?: boolean;
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
  const [isChatUp, setIsChatUp] = useState(true);
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

  const checkChatStatus = async () => {
    try {
      const response = await axios.get("/api/chat/health");
      setIsChatUp(response.data.res);
    } catch (error) {
      console.error("Error checking chat status:", error);
      setIsChatUp(false);
    }
  };

  const toggleChat = () => {
    //THIS WILL TRIGGER ONCE, IF THE CHAT IS FALSE THEN DO NOT ENTER IN THE CONDITION
    if (!isOpen && isChatUp) {
      checkChatStatus();
    }

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
        isChatUp,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
}

export default ChatBotProvider;
