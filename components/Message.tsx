"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import "../styles/tiptap.css";
import { Message as IMessage } from "@/interfaces/IMessage";
import { formatTime, formatDatetime } from "@/utils/dateFormatter";
import Image from "next/image";

import { cn } from "@/utils/cn";

interface MessageProps {
  message: IMessage;
}

const TYPING_SPEED = 75; // Adjust typing speed here (milliseconds per word)

function Message({ message }: MessageProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    if (message.sender === "bot") {
      setIsTyping(true);
      setDisplayedContent("");
      //NOTE: This is a workaround for the typing, that is skipping the first word.
      const words = ["", ...message.content.split(" ")];
      let currIndx = 0;

      const intervalId = setInterval(() => {
        if (currIndx < words.length) {
          setDisplayedContent((prevContent) => {
            if (currIndx === 0) {
              return words[currIndx];
            }

            return prevContent + " " + (words[currIndx] ?? "");
          });
          currIndx++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, TYPING_SPEED);

      return () => clearInterval(intervalId);
    } else {
      setDisplayedContent(message.content);
      setIsTyping(false);
    }
  }, [message]);

  return (
    <div
      className={cn(
        "flex flex-col mb-4  ",
        message.sender === "user" ? "items-end" : "items-start"
      )}
    >
      {message.sender === "bot" && (
        <Image
          src="/Wilson.png"
          alt="A picture of Wilson"
          width={50}
          height={50}
          className=" object-cover w-8 h-8 rounded-full mb-1 border border-primary-700/50 shadow-lg "
        />
      )}

      <div
        className={cn(
          "inline-block p-3 rounded-lg tiptap !text-xs border border-primary-700/50 shadow-lg max-w-[80%]",
          message.sender === "user"
            ? "bg-primary-700 text-white"
            : "bg-accent-800 text-primary-100",
          isTyping && "animate-pulse-fast"
        )}
        dangerouslySetInnerHTML={{ __html: displayedContent }}
      />
      <p
        title={formatDatetime(message.created_at, locale)}
        className="text-xs text-primary-400 mt-1 italic"
      >
        {formatTime(message.created_at, locale)}
      </p>
    </div>
  );
}

export default Message;
