"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  isLogin?: boolean;
}

export const Button = ({ onClick, children, isLogin }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
    className={`text-white ${isLogin ? "bg-[#6a51a6]" : "bg-[#6a51a6]"} focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border-2 border-[#6a51a6] hover:bg-[#6a51a6] hover:text-white`}
    >
      {children}
    </button>
  );
};