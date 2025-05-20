"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import ChatInput from "./inputs/ChatInput";
import { useChatBot } from "@/context/ChatBotProvider";
import Message from "./Message";
import { cn } from "@/utils/cn";

function ChatBubble() {
  const { messages, addMessage, isOpen, toggleChat } = useChatBot();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const cleanInput = inputValue.replace(/<\/?[^>]+(>|$)/g, "").trim();
      if (cleanInput) {
        addMessage(cleanInput, "user");
        setInputValue("");
        setLoading(true);
        setError("");
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: cleanInput }),
          });
          if (!res.ok) {
            throw new Error("Failed to get response");
          }
          const data = await res.json();
          if (data && data.res) {
            addMessage(data.res, "bot");
          } else {
            addMessage("Sorry, I didn't understand that.", "bot");
          }
        } catch (err) {
          setError("There was a problem connecting to the chat service.");
          addMessage(
            "Sorry, there was a problem connecting to the chat service.",
            "bot"
          );
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col items-end fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="border border-primary-700/60 z-50 backdrop-blur-lg bg-gradient-to-br from-primary-900/80 via-primary-950/90 to-accent-900/40 shadow-2xl rounded-3xl w-80 sm:w-96 mb-6 overflow-hidden ring-4 ring-accent-800/30 animate-fade-in"
          >
            {/* Chat Header */}
            <div className="flex justify-between items-center p-5 border-b border-primary-800/40 bg-gradient-to-br from-primary-900/80 via-primary-950/90  ">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-3 h-3 rounded-full bg-accent-500 animate-pulse"
                  )}
                ></span>
                <h3 className="font-bold text-lg text-primary-100 tracking-wide drop-shadow-sm">
                  Chat with Wilson
                </h3>
              </div>
              <button
                onClick={toggleChat}
                className="text-primary-400 hover:text-accent-400 transition-colors p-1 rounded-full hover:bg-primary-900/40"
                aria-label="Close chat"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="p-4 h-80 overflow-y-auto bg-primary-950/30">
              {messages.length === 0 ? (
                <div className="text-center text-primary-400 py-8">
                  <p>Send a message to start chatting!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <Message key={message.id} message={message} />
                ))
              )}
              {loading && (
                <div className="text-primary-400 text-sm py-2 animate-pulse">
                  Bot is typing...
                </div>
              )}
              {error && (
                <div className="text-red-400 text-xs py-1">{error}</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-primary-800/40 flex items-end bg-gradient-to-t from-primary-950/40 to-primary-900/10">
              <div className="flex items-center w-full border border-primary-800 rounded-2xl bg-primary-900/80 transition-all duration-500 shadow-inner">
                <div className="flex-grow">
                  <ChatInput
                    value={inputValue}
                    onChange={setInputValue}
                    onKeyDown={handleKeyDown}
                    className="p-2 bg-transparent text-primary-100"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  className="cursor-pointer p-3 text-accent-400 hover:text-accent-200 transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-transparent disabled:shadow-none disabled:text-primary-400"
                  aria-label="Send message"
                  disabled={loading}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Bubble Button */}
      <button
        onClick={toggleChat}
        className="border-2 cursor-pointer border-primary-800 hover:scale-110 rounded-full p-4  bg-linear-to-tl from-primary-950 via-primary-950 bg-primary-800 transition-all duration-500"
      >
        <FaComments size={30} />
      </button>
    </div>
  );
}

export default ChatBubble;
