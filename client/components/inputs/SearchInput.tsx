"use client";

import { InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";
import { cn } from "@/utils/cn";

interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  value: string;
  onChange: (value: string) => void;
  containerClassName?: string;
}

const SearchInput = ({
  value,
  onChange,
  containerClassName,
  className,
  ...props
}: SearchInputProps) => {
  return (
    <div className={cn("relative w-full max-w-md mx-auto", containerClassName)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <FaSearch className="text-gray-400 dark:text-gray-400" />
      </div>
      <input
        type="text"
        className={cn(
          "block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-primary-800 rounded-xl leading-5 bg-white/80 dark:bg-primary-900/50 backdrop-blur-sm shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-transparent sm:text-sm text-gray-900 dark:text-primary-100 transition-all duration-300",
          className,
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
