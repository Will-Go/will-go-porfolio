"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";
import { RiLoaderLine } from "react-icons/ri";

import ChatInput from "./inputs/ChatInput";
import { useChatBot } from "@/context/ChatBotProvider";
import Message from "./Message";
import { cn } from "@/utils/cn";
import axios from "axios";

import { removeHTMLtags } from "@/utils/removeHTMLtags";

const LOADING_MESSAGES = [
  "Wilson is typing",
  "Wilson is thinking",
  "Wilson is checking messages",
  "Wilson is remembering",
  "Wilson is pondering",
  "Wilson is contemplating",
];

function ChatBubble() {
  const { messages, addMessage, isOpen, toggleChat } = useChatBot();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

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
          const res = await axios.post("/api/chat", { text: cleanInput });
          if (res.data && res.data.res) {
            addMessage(res.data.res, "bot");
          } else {
            addMessage("Sorry, I think there are technical issues.", "bot");
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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1000);
    } else {
      setLoadingMessageIndex(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  return (
    <div className="flex flex-col items-end fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              isMobile
                ? { opacity: 0, y: "100vh" }
                : { opacity: 0, y: 50, height: 0, width: 0 }
            }
            animate={
              isMobile
                ? {
                    opacity: 1,
                    y: 0,
                    width: "100vw",
                    height: "100vh",
                    bottom: 0,
                    right: 0,
                    position: "fixed",
                    borderRadius: 0,
                  }
                : { opacity: 1, y: 0, height: "auto", width: "24rem" }
            }
            exit={
              isMobile
                ? { opacity: 0, y: "100vh" }
                : { opacity: 0, y: 50, height: 0, width: 0 }
            }
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={cn(
              "border border-primary-700/60 z-50 backdrop-blur-lg bg-gradient-to-br from-primary-900/50 via-primary-950/50 to-accent-900/40 shadow-2xl mb-6 overflow-hidden ring-4 ring-accent-800/30",
              isMobile ? "rounded-none" : "rounded-3xl",
              error && "border-error ring-error/20 ring-4"
            )}
            style={
              isMobile
                ? {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    margin: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 100,
                  }
                : {}
            }
          >
            {/* Chat Header */}
            <div className="flex justify-between items-center p-5 border-b border-primary-800/40 bg-gradient-to-br from-primary-900/80 via-primary-950/90  ">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-3 h-3 rounded-full bg-accent-500 animate-pulse",
                    error && "bg-error animate-none"
                  )}
                ></span>
                <h3 className="font-bold text-lg text-primary-100 tracking-wide drop-shadow-sm">
                  Chat with Wilson
                </h3>
              </div>
              <button
                onClick={toggleChat}
                className="text-primary-400 cursor-pointer hover:text-accent-400 transition-colors p-1 rounded-full hover:bg-primary-900/40"
                aria-label="Close chat"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="p-4 h-80 overflow-y-auto bg-primary-950/20">
              {messages.length === 0 ? (
                <div className="text-center text-primary-400 py-8 ">
                  <p className="text-xs">Send a message to start chatting!</p>
                </div>
              ) : (
                messages.map((message, idx) => (
                  <Message key={message.id + idx} message={message} />
                ))
              )}
              {loading && (
                <div className="flex items-center gap-2 text-primary-400 text-xs py-2 animate-pulse">
                  {LOADING_MESSAGES[loadingMessageIndex]}{" "}
                  <RiLoaderLine fontSize={15} className="animate-spin" />
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
                  {!!error ? (
                    <p className="text-xs italic text-neutral-500 p-4">
                      Chat is disabled due to an error
                    </p>
                  ) : (
                    <ChatInput
                      value={inputValue}
                      onChange={setInputValue}
                      onKeyDown={handleKeyDown}
                      className="p-2 bg-transparent text-primary-100"
                      disabled={loading || !!error}
                    />
                  )}
                </div>
                <button
                  onClick={handleSendMessage}
                  className="cursor-pointer p-3 text-accent-400 hover:text-accent-200 transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-transparent disabled:shadow-none disabled:text-primary-400"
                  aria-label="Send message"
                  disabled={loading || !removeHTMLtags(inputValue) || !!error}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Bubble Button */}
      <div className="flex  items-center gap-1">
        <button
          onClick={toggleChat}
          className="border-2 cursor-pointer border-primary-800 hover:scale-110 rounded-full p-4 bg-linear-to-tl from-primary-950 via-primary-950 bg-primary-800 transition-all duration-500 relative overflow-hidden"
          style={{ width: "64px", height: "64px" }} // Ensure consistent size for animation
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? "times" : "comments"}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {isOpen ? <FaTimes size={30} /> : <FaComments size={30} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

export default ChatBubble;
