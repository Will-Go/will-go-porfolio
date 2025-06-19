"use client";
import "@/styles/tiptap.css";
import { useEffect, memo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useTranslations } from "next-intl";

//UTILS
import { cn } from "@/utils/cn";

//INTERFACE
interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => true,
    };
  },
});

function ChatInput({
  value,
  onChange,
  onKeyDown,
  className,
  disabled,
  placeholder,
}: ChatInputProps) {
  const t = useTranslations("chat");
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable unnecessary history functionality since the editor manages it
        history: {
          depth: 10, // Reduce history depth to save memory
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
      DisableEnter,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "w-full  focus:outline-none placeholder-primary-400! text-sm leading-6 focus:shadow-none! max-h-[200px] overflow-y-auto whitespace-pre-wrap break-words break-all word-break p-2",
        style:
          "white-space: pre-wrap; word-break: break-word; overflow-wrap: break-word; word-wrap: break-word;",
      },
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();

      onChange(newContent);
    },
  });

  // Update editor content if value prop changes from outside
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  // Update editor's editable state when disabled prop changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  if (!editor) return null;

  return (
    <EditorContent
      className={cn("w-full", className)}
      onKeyDown={onKeyDown}
      editor={editor}
    />
  );
}

export default memo(ChatInput);
