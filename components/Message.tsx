import "../styles/tiptap.css";

import { Message as IMessage } from "@/interfaces/IMessage";
import { formatTime } from "@/utils/dateFormatter";

import { cn } from "@/utils/cn";

interface MessageProps {
  message: IMessage;
}

function Message({ message }: MessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-4  ",
        message.sender === "user" ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "inline-block p-3 rounded-lg tiptap !text-sm border border-primary-700/50 shadow-lg max-w-[80%]",
          message.sender === "user"
            ? "bg-primary-700 text-white"
            : "bg-accent-800 text-primary-100"
        )}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: message.content }}
      />
      <div className="text-xs text-primary-400 mt-1 italic">
        {formatTime(message.created_at)}
      </div>
    </div>
  );
}

export default Message;
