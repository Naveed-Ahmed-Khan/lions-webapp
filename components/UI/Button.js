import React from "react";

const Button = ({ children, alt, onClick, type, disabled, fullwidth }) => {
  return (
    <button
      className={`${
        alt
          ? // ? "bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800"
            "bg-gray-700 active:bg-gray-800"
          : // : "bg-gradient-to-b from-green-700 via-green-600 to-green-700 scale-100"
            "bg-green-600 active:bg-green-700"
      }
      ${fullwidth ? "w-full" : "w-auto"}
      ${
        disabled
          ? "opacity-70"
          : "opacity-100 shadow-none shadow-zinc-300 active:shadow active:shadow-zinc-300 hover:shadow-md hover:shadow-zinc-400"
      }
    text-white transition-all py-[.80em] px-[1.80em] rounded-md 
       `}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
