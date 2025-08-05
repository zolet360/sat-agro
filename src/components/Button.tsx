import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={`px-4 justify-center items-center py-2 bg-black rounded-xl transition-all duration-300 hover:shadow-lg flex gap-3 ${className}`}>
      {children}
    </button>
  );
}
