import { Children } from "react";

interface buttonProps {
  children: any;
  className?: string;
}

export default function Button({ children, className, ...props }: buttonProps) {
  return (
    <button
      {...props}
      className={`px-3 py-2 bg-black rounded-lg text-lg transition-all duration-300 hover:shadow-lg flex gap-3 ${className}`}
    >
      {children}
    </button>
  );
}
