"use client";

interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="cursor-default group relative overflow-hidden flex flex-col border-2 border-white/10 p-3 rounded-md hover:rounded-xs w-full bg-linear-to-tl from-black bg-zinc-900 transition-all duration-500">
      {children}
    </div>
  );
}

export default Card;
