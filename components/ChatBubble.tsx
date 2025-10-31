"use client";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaExclamationTriangle,
} from "react-icons/fa";
import { RiLoaderLine } from "react-icons/ri";
import { useTranslations } from "next-intl";

import ChatInput from "./inputs/ChatInput";
import { useChatBot } from "@/context/ChatBotProvider";
import Message from "./Message";
import { cn } from "@/utils/cn";
import axios from "axios";

import { removeHTMLtags } from "@/utils/removeHTMLtags";

function ChatBubble() {
  const t = useTranslations("chat");
  const { messages, addMessage, isOpen, toggleChat, isChatUp } = useChatBot();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const LOADING_MESSAGES = [
    t("loadingMessages.typing"),
    t("loadingMessages.thinking"),
    t("loadingMessages.checking"),
    t("loadingMessages.remembering"),
    t("loadingMessages.pondering"),
    t("loadingMessages.contemplating"),
  ];

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
          const res = await axios.post("/api/chat", { text: inputValue });
          if (res.data && res.data.res) {
            addMessage(res.data.res, "bot");
          } else {
            addMessage(t("technicalIssue"), "bot");
          }
        } catch (err) {
          setError(t("connectionError"));
          addMessage(t("connectionErrorMessage"), "bot");
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
  }, [loading, LOADING_MESSAGES.length]);

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
            transition={{ duration: 0.4, ease: "anticipate" }}
            className={cn(
              "border border-primary-700/60 z-50 backdrop-blur-lg bg-gradient-to-br from-primary-900/50 via-primary-950/50 to-accent-900/40 shadow-2xl mb-6 overflow-hidden ring-4 ring-accent-800/30",
              isMobile ? "rounded-none flex flex-col h-full" : "rounded-3xl",
              (error || !isChatUp) && "border-error ring-error/20 ring-4"
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
                    maxHeight: "100vh",
                    zIndex: 100,
                  }
                : {}
            }
          >
            {" "}
            {/* Chat Header */}
            <div
              className={cn(
                "flex justify-between items-center p-5 border-b border-primary-800/40 bg-gradient-to-br from-primary-900/80 via-primary-950/90",
                isMobile ? "flex-shrink-0" : ""
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-3 h-3 rounded-full bg-accent-500 animate-pulse",
                    (error || !isChatUp) && "bg-error animate-pulse"
                  )}
                ></span>{" "}
                <h3 className="font-bold text-lg text-primary-100 tracking-wide drop-shadow-sm">
                  {t("title")}
                </h3>
              </div>
              <button
                onClick={toggleChat}
                className="text-primary-400 cursor-pointer hover:text-accent-400 transition-colors p-1 rounded-full hover:bg-primary-900/40"
                aria-label={t("closeButton")}
              >
                <FaTimes size={20} />
              </button>
            </div>{" "}
            {/* Messages Container */}
            <div
              className={cn(
                "p-4 overflow-y-auto bg-primary-950/20",
                isMobile ? "flex-1 min-h-0" : "h-80"
              )}
            >
              {!isChatUp ? (
                <div className="text-center  py-8 ">
                  <p className="text-xs text-red-400">{t("outOfService")}</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-primary-400 py-8 ">
                  <p className="text-xs">{t("startChat")}</p>
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
            </div>{" "}
            {/* Input Area */}
            <div
              className={cn(
                "p-4 border-t border-primary-800/40 flex flex-col gap-1 bg-gradient-to-t from-primary-950/40 to-primary-900/10",
                isMobile ? "flex-shrink-0 sticky bottom-0" : ""
              )}
            >
              <div className="flex items-center w-full border border-primary-800 rounded-2xl bg-primary-900/80 transition-all duration-500  shadow-inner overflow-hidden">
                <div className="w-full">
                  {!!error || !isChatUp ? (
                    <p className="text-xs italic text-red-300 p-4">
                      {t("outOfService")}
                    </p>
                  ) : (
                    <ChatInput
                      value={inputValue}
                      onChange={setInputValue}
                      onKeyDown={handleKeyDown}
                      className="p-2 bg-transparent text-primary-100 "
                      disabled={loading || !!error || !isChatUp}
                      placeholder={t("input.placeholder")}
                    />
                  )}
                </div>
                <button
                  onClick={handleSendMessage}
                  className="cursor-pointer p-3 text-accent-400 hover:text-accent-200 transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-transparent disabled:shadow-none disabled:text-primary-400"
                  aria-label={t("sendButton")}
                  disabled={loading || !removeHTMLtags(inputValue) || !!error}
                >
                  <FaPaperPlane />
                </button>
              </div>
              <div className="flex justify-end items-center">
                {" "}
                <Link
                  href={"/give-me-the-token"}
                  className="text-xs text-primary-600 hover:text-accent-400 transition-colors hover:underline"
                >
                  {t("input.secretCode")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>{" "}
      {/* Chat Bubble Button */}
      <div className="flex  items-center gap-1">
        <button
          onClick={toggleChat}
          className={cn(
            "border-2 cursor-pointer hover:scale-110 rounded-full p-4 transition-all !z-30 duration-500 relative overflow-hidden",
            isChatUp
              ? "border-primary-800 bg-linear-to-tl from-primary-950 via-primary-950 bg-primary-800"
              : "border-red-600 bg-gradient-to-tl from-red-900 via-red-950 to-red-800"
          )}
          style={{ width: "64px", height: "64px" }} // Ensure consistent size for animation
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isChatUp ? (isOpen ? "times" : "comments") : "outOfService"}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                !isChatUp && "text-red-300"
              )}
            >
              {!isChatUp ? (
                <FaExclamationTriangle size={30} />
              ) : isOpen ? (
                <FaTimes size={30} />
              ) : (
                <FaComments size={30} />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

export default ChatBubble;
